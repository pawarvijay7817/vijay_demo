import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  response;
  products;
  cartList=[];
  cartCount=0;
  display="none";
  constructor(private router:Router,
              private cartSrv:CartServiceService
             ) { }

  ngOnInit(): void {
    this.getProducts();
    this.cartList=JSON.parse(localStorage.getItem("products"));
    if(this.cartList !=null && this.cartList !=undefined){
      this.cartCount=this.cartList.length;
    }else{
      this.cartCount=0;
    }
  }
  getProducts(){
    this.cartSrv.getProducts().subscribe(res=>{
      this.products=res;
      console.log(this.products);
    });
  }
  addtocart(idd,name,price){
    // console.log(id+''+name+''+price);
    let prod =[];
    let products=JSON.parse(localStorage.getItem('products'));
    if(products !=null && products !=undefined ){
      prod= JSON.parse(localStorage.getItem("products"));

      const productExistInCart=prod.find(({id})=> id=== idd);
      if(productExistInCart){
        productExistInCart.item +=1;
      }else{
         prod.push({id:idd, name:name,price:price,item:1});
      } 
    }else{
      prod.push({id:idd, name:name,price:price,item:1});
    }
   
    localStorage.setItem("products",JSON.stringify(prod));
    this.cartCount=prod.length;
    this.display="block";
    setTimeout(()=>{
      this.display="none";      
    },3000);
 
  }  
  removeProduct(productId){
    let prod=[];
    prod=JSON.parse(localStorage.getItem('products'));
    let productExist=prod.find(({id})=> id==productId);
    if(productExist){
      let items=productExist.item; 
      if(items>1){
        productExist.item -=1;
      }else{
        prod=prod.filter(({id})=> id !==productId);
      }    
    }
    localStorage.setItem("products",JSON.stringify(prod));
    
  } 
  
 

}
