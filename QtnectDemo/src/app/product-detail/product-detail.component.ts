import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product:any;
  isClicked :boolean = false;
  
  
  constructor(private service:ProductService, private cart:CartService,private router:Router){ }

  ngOnInit(){
    this.service.getProduct().subscribe((res:any)=>{
       this.product = res.find((product: { id: any; }) => product.id == localStorage.getItem('id'));
    });
    // console.log(this.product);
  }

  onClick(product:any){
   this.cart.add(product);
   this.isClicked = true;
        setTimeout(() => {
          this.isClicked = false;
        }, 1500);
 }
  

  Cart(){
    this.router.navigate(['cart']);
  }

  Home(){
    this.router.navigate(['plist']);
  }
}
