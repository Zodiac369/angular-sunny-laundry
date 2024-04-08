import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { sample_products, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getAll():Product[] {
    return sample_products;
  }
  
  getAllProductsSearchTerm(searchTerm:string) { 
    return this.getAll().filter(
      product => product.name.toLowerCase().
      includes(searchTerm.toLowerCase()))
  }

  getAllTags(): Tag[]{
    return sample_tags;
  }

  getAllProductsByTag(tag: string): Product[]{
    return tag == "Tous"?
    this.getAll():
    this.getAll().filter(
      product => product.tags?.
      includes(tag));
  } 

  getProductById(productId: string){
    return this.getAll().find(product => product.id == productId) ?? new Product();
  }

}
