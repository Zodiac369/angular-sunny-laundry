import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

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
  totalPrice: number = 0;
  
  constructor(activatedRoute: ActivatedRoute, productService: ProductService) {
    activatedRoute.params.subscribe((params) =>{
      if (params.id)
      this.product = productService.getProductById(params.id);
    })
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

}
