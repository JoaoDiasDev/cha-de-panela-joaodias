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

  // async downloadAndDisplayImage(
  //   url: string,
  //   productName: string
  // ): Promise<string> {
  //   const imageUrl = url;
  //   const fileName = '../../assets/images/products-images/' + productName;
  //   const result = await this.http
  //     .get(imageUrl, { responseType: 'blob' })
  //     .toPromise();
  //   if (result) {
  //     const objectUrl = URL.createObjectURL(result);
  //     const a = document.createElement('a');
  //     a.href = objectUrl;
  //     a.download = fileName;
  //     a.style.display = 'none';
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(objectUrl);
  //     return fileName;
  //   } else {
  //     throw new Error('Failed to download image');
  //   }
  // }

  async downloadAndDisplayImage(
    url: string,
    productName: string
  ): Promise<string> {
    const imageUrl = url;
    const fileName = `products-images/${productName}`;
    const cacheKey = `image_${fileName}`;
    const cachedImage = localStorage.getItem(cacheKey);
    if (cachedImage) {
      // Image is already in cache, use it
      return cachedImage;
    }
    // Image is not in cache, download it
    const result = await this.http
      .get(imageUrl, { responseType: 'blob' })
      .toPromise();
    if (result) {
      const objectUrl = URL.createObjectURL(result);
      const img = new Image();
      img.src = objectUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d')?.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        localStorage.setItem(cacheKey, dataUrl);
      };
      return objectUrl;
    } else {
      throw new Error('Failed to download image');
    }
  }
}
