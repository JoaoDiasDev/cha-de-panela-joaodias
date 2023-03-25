import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Products');
  }

  addProduct(addProductRequest: Product): Observable<Product> {
    addProductRequest.idProduct = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Product>(
      this.baseApiUrl + '/api/Products',
      addProductRequest
    );
  }

  getProduct(idProduct: string): Observable<Product> {
    return this.http.get<Product>(
      this.baseApiUrl + '/api/Products/' + idProduct
    );
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
