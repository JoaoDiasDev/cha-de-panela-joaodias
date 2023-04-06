import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  imagePath: string = '';

  constructor(private productService: ProductsService) {}

  async cacheProductImages() {
    for (var product of this.products) {
      product.productLink = await this.productService.downloadAndDisplayImage(
        product.imageLink,
        product.name
      );
      // Use imagePath in an <img> tag to display the image
      console.log(`Image saved to ${this.imagePath}`);
    }
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.sort((a: Product, b: Product) =>
          a.name.localeCompare(b.name)
        );
        this.cacheProductImages();
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
