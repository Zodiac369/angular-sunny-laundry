import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  products:Product[] = [];

  constructor(private productService: ProductService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) =>{
      if(params.rechercheTerm)
      this.products = this.productService.getAllProductsSearchTerm(params.rechercheTerm);
      else if(params.tag)
      this.products = this.productService.getAllProductsByTag(params.tag);
      else
      this.products = productService.getAll();
    })
   }

  ngOnInit(): void {
  }

}
