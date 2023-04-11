import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product.model';
import {
  Observable,
  catchError,
  delayWhen,
  retryWhen,
  take,
  throwError,
  timeout,
  timer,
} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/Products`).pipe(
      timeout(500),
      retryWhen((errors) =>
        errors.pipe(
          delayWhen(() => timer(500)), // delay between retries
          take(5) // retry up to 5 times
        )
      ),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error(error.error));
      })
    );
  }

  addProduct(addProductRequest: Product): Observable<Product> {
    addProductRequest.idProduct = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Product>(
      this.baseApiUrl + '/api/Products',
      addProductRequest
    );
  }

  getProduct(idProduct: string): Observable<Product> {
    try {
      return this.http.get<Product>(
        this.baseApiUrl + '/api/Products/' + idProduct
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  updateProduct(
    idProduct: string,
    updateProductRequest: Product
  ): Observable<Product> {
    return this.http.put<Product>(
      this.baseApiUrl + '/api/Products/' + idProduct,
      updateProductRequest
    );
  }

  deleteProduct(idProduct: string): Observable<Product> {
    return this.http.delete<Product>(
      this.baseApiUrl + '/api/Products/' + idProduct
    );
  }

  reserveProduct(
    idProduct: string,
    reserveProductRequest: Product
  ): Observable<Product> {
    reserveProductRequest.reserved = true;
    return this.http.put<Product>(
      this.baseApiUrl + '/api/Products/reserve/' + idProduct,
      reserveProductRequest
    );
  }
}
