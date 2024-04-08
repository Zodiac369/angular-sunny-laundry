import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  selectedState: string = '';
  selectedMaterial: string = '';
  selectedServices: string[] = [];
  
  constructor(activatedRoute: ActivatedRoute, productService: ProductService,
    private cartService:CartService, private router: Router) {
      activatedRoute.params.subscribe((params) => {
        if (params.id) {
          productService.getProductById(params.id).subscribe(serverProduct => {
            if (Array.isArray(serverProduct) && serverProduct.length > 0) {
              this.product = serverProduct[0]; // Sélectionner le premier produit du tableau
            } else if (!Array.isArray(serverProduct)) {
              this.product = serverProduct; // Affecter directement si c'est un seul objet
            } else {
              // Gérer le cas où aucun produit n'est trouvé
            }
          });
        }
      });      
  }

  selectState(state: string) {
    this.selectedState = state;
  }

  selectMaterial(material: string) {
    this.selectedMaterial = material;
  }

  toggleService(service: string) {
    if (this.selectedServices.includes(service)) {
        this.selectedServices = this.selectedServices.filter(s => s !== service);
    } else {
        if (this.selectedServices.length < 2) {
            this.selectedServices.push(service);
        } 
    }
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
