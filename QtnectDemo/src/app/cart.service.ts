import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  imagePath: string;
  description:string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Map<Product, number> = new Map();

  addToCart(product: Product) {

    if ( this.cart.has(product) ){
    const quantity = this.cart.get(product) || 0;
    this.cart.set(product, quantity + 1);
    }
    else{
      this.cart.set(product, 1);
    }
  }

  getItems():any {
    return Array.from(this.cart.entries()).map(([product, quantity]) => {
      return {
        product, 
        quantity
      };
    });
  }

  clearCart() {
    this.cart = new Map();
    this.cart.clear();
    console.log(this.cart);
  }

  add(product: Product){
   
    if ( this.cart.has(product )) {
      console.log(true);
      const currentQuantity = this.cart.get(product) || 0;
      this.cart.set(product, currentQuantity + 1);
    }else{
      this.cart.set(product, 1);
    }
  }

  delete(product: Product){
   
    if (this.cart.has(product)) {
      const currentQuantity = this.cart.get(product) || 0;
      if (currentQuantity > 1) {
        this.cart.set(product, currentQuantity - 1);
      } else {
        this.remove(product);
      }
    }
  }

  
  remove(product: Product) {
    this.cart.delete(product);
  }

}


