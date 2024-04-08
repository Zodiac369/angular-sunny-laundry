import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, activatedRoute: ActivatedRoute) {
    let productsObservable: Observable<Product[]>;

    activatedRoute.params.subscribe((params) =>{
      if(params.rechercheTerm)
      productsObservable = this.productService.getAllProductsSearchTerm(params.rechercheTerm);
      else if(params.tag)
        productsObservable = this.productService.getAllProductsByTag(params.tag);
      else
        productsObservable = productService.getAll();

        productsObservable.subscribe((serverProducts) =>{
          this.products = serverProducts;
        })
    })
   }

  ngOnInit(): void {
  }

}
