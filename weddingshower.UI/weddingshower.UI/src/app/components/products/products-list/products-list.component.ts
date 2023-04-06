import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeValue } from '@angular/platform-browser';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  baseApiUrl: string = environment.baseApiUrl;

  constructor(
    private productService: ProductsService,
    private sanitizer: DomSanitizer
  ) {}

  getImageUrl(product: Product): SafeValue {
    product.productLink = this.sanitizer.bypassSecurityTrustUrl(
      product.imageLink
    );
    return product.productLink;
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        products.forEach((prod) => {
          prod.productLink = this.getImageUrl(prod);
        });
        this.products = products.sort((a: Product, b: Product) =>
          a.name.localeCompare(b.name)
        );
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
