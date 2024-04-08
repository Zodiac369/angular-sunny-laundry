import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { sample_products, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCT_BY_ID_URL, PRODUCTS_BY_SEARCH_URL, PRODUCTS_BY_TAG_URL, PRODUCTS_TAGS_URL, PRODUCTS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }
  
  getAllProductsSearchTerm(searchTerm:string) { 
    return this.http.get<Product[]>(PRODUCTS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(PRODUCTS_TAGS_URL);
  }

  getAllProductsByTag(tag: string): Observable<Product[]>{
    return tag == "Tous"?
    this.getAll() :
    this.http.get<Product[]>(PRODUCTS_BY_TAG_URL + tag);
  } 

  getProductById(productId: string): Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCT_BY_ID_URL + productId);
  }

}
