import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productDetails: Product = {
    idProduct: '',
    name: '',
    imageLink: '',
    imageData: '',
    productLink: '',
    reserved: false,
    whoReserved: '',
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const idProduct = params.get('idProduct');

        if (idProduct) {
          this.productService.getProduct(idProduct).subscribe({
            next: (response) => {
              this.productDetails = response;
            },
          });
        }
      },
    });
  }

  updateProduct() {
    this.productService
      .updateProduct(this.productDetails.idProduct, this.productDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['products']);
        },
      });
  }

  deleteProduct(idProduct: string) {
    this.productService.deleteProduct(idProduct).subscribe({
      next: (response) => {
        this.router.navigate(['products']);
      },
    });
  }
}
