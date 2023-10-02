import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';



export interface Product {
  id: number;
  name: string;
  price: number;
  imagePath: string;
  description:string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems :any[] = [];
  purchaseComplete: boolean = false;
  

  constructor(private router:Router,private service:ProductService,private cart:CartService, private changeDetectorRef: ChangeDetectorRef ){
    
  }

  ngOnInit(){

      this.cartItems = this.cart.getItems();
      
      
  }

  addToCart(product:any){
      this.cart.add(product);
  }

  purchase(){
    this.purchaseComplete = true;
    this.cartItems = [];
    this.cart.clearCart();
  }

  return(){
    this.router.navigate(['plist']);
  }


  calculateSubtotal(product:any){
     
      const quantity = this.cart.getItems().find((item:any) => item.product === product).quantity;
        const subtotal = quantity * product.price;
        return subtotal;

  }

  totalPrice(cartItems:any){
  const total = cartItems.reduce((sum:any, item:any) => {
    return sum + item.product.price * item.quantity;
       }, 0);
  return total;

  }

  add(product:any){
      this.cart.add(product);
      this.cartItems = this.cart.getItems();
      

  }

  delete(product:any){
    this.cart.delete(product);
    this.cartItems = this.cart.getItems();
  }

  remove(product:any){
    this.cart.remove(product);
    this.cartItems = this.cart.getItems();
  }

  Cart(){
    this.purchaseComplete = false;
    this.router.navigate(['cart']);
  }

  Home(){
    this.purchaseComplete = false;
    this.router.navigate(['plist']);

  }



}
