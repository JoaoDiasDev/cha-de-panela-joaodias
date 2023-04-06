import { SafeUrl } from '@angular/platform-browser';

export interface Product {
  idProduct: string;
  name: string;
  imageLink: string;
  imageData: any;
  productLink: SafeUrl;
  reserved: boolean;
  whoReserved: string;
}
