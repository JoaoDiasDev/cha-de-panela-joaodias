import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  
  products: Product[] = [
    {
      id: '1',
      name: 'Panela',
      image: 'string',
      link: string;
      reserved: boolean;
      whoReserved: string;
    },
    {

    },
  ];
  constructor() {

  }

  ngOnInit(): void {

      this.products.push()
  }
}
