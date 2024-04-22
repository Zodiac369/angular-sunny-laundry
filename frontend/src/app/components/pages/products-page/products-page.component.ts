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
    // Observable pour récupérer la liste de produits en fonction des paramètres de l'URL
    let productsObservable: Observable<Product[]>;

    // Souscrire aux changements des paramètres de l'URL
    activatedRoute.params.subscribe((params) =>{
      // Vérifier si un terme de recherche est présent dans les paramètres de l'URL
      if(params.rechercheTerm)
        productsObservable = this.productService.getAllProductsSearchTerm(params.rechercheTerm);
      // Vérifier si un tag est présent dans les paramètres de l'URL
      else if(params.tag)
        productsObservable = this.productService.getAllProductsByTag(params.tag);
      // Si aucun paramètre spécifié, récupérer tous les produits
      else
        productsObservable = productService.getAll();

      // Souscrire aux données récupérées et les affecter à la liste de produits
      productsObservable.subscribe((serverProducts) =>{
        this.products = serverProducts;
      });
    });
  }

  ngOnInit(): void {
  }
}
