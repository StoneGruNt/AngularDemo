import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get('assets/product.json')
  }

}


