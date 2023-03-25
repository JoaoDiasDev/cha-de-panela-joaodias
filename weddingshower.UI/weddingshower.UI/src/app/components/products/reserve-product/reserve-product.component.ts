import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-reserve-product',
  templateUrl: './reserve-product.component.html',
  styleUrls: ['./reserve-product.component.css'],
})
export class ReserveProductComponent implements OnInit {
  productDetails: Product = {
    idProduct: '',
    name: '',
    imageLink: '',
    imageData: '',
    productLink: '',
    reserved: true,
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

  reserveProduct() {
    this.productService
      .reserveProduct(this.productDetails.idProduct, this.productDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['products']);
        },
      });
  }
}
