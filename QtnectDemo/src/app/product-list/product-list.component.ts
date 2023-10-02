import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: any[] = [];

  filteredProducts: any[] =[];

  shirtsChecked: boolean = false;
  tShirtsChecked: boolean = false;
  jeansChecked: boolean = false;
  cardigansChecked: boolean = false;
  chinosChecked: boolean = false;
  hoodiesChecked: boolean = false;


  selectedSortOption: string = 'default';
  sortOptions: string[] = ['default', 'priceLowToHigh', 'priceHighToLow'];

 

  clickedProducts: Set<number> = new Set<number>();


  
  constructor(private service:ProductService,private router:Router,private cart:CartService){ }

  async ngOnInit(){
    this.service.getProduct().subscribe((res:any)=>{this.products = res;this.filteredProducts = res});

  }


  sortProducts() {
    switch (this.selectedSortOption) {
      case 'priceLowToHigh':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        
        break;
    }
  }



  onClick(product:any){
    localStorage.setItem("id",product.id);
    this.router.navigate(['pdetail']);
  }

  addToCart(product:any){

    this.clickedProducts.add(product.id);
    this.cart.add(product);

    setTimeout(() => {
      this.clickedProducts.delete(product.id);
    }, 2000);
  
  }

   isClicked(product: any) {
  return this.clickedProducts.has(product.id);
    }

  Cart(){
    this.router.navigate(['cart']);
  }

  Home(){
    this.router.navigate(['plist']);
  }

  filterProducts(){

    this.filteredProducts = this.products;
    if (this.shirtsChecked) {
      this.filteredProducts = this.filteredProducts.filter(product => product.name.toLowerCase().includes("shirt")&& !product.name.toLowerCase().includes("t-shirt"));}
    if (this.tShirtsChecked) {
      this.filteredProducts = this.filteredProducts.filter(product => product.name.toLowerCase().includes("t-shirt"));}
    if (this.cardigansChecked) {
      this.filteredProducts = this.filteredProducts.filter(product => product.name.toLowerCase().includes("pullover"));}
     if (this.jeansChecked) {
      this.filteredProducts = this.filteredProducts.filter(product => product.name.toLowerCase().includes("jeans"));}
     if (this.hoodiesChecked) {
      this.filteredProducts = this.filteredProducts.filter(product => product.name.toLowerCase().includes("hoodie"));}
     if (this.chinosChecked) {
      this.filteredProducts = this.filteredProducts.filter(product => product.name.toLowerCase().includes("chinos"));}
  }
}
     
