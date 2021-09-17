import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList=[];
  cartCount:any;
  cartTotal:any;
  discount:any;grandTotal:any;
  constructor() { }

  ngOnInit(): void {
    this.cartList=JSON.parse(localStorage.getItem('products'));
    if(this.cartList !=null && this.cartList !=undefined){
      this.cartCount=this.cartList.length;
      this.getCartTotal();  
    }else{
      this.cartCount=0;
    }
  }
  ngOnDestroy(){
    localStorage.setItem('products',JSON.stringify(this.cartList));
  }
  getCartTotal(){
    let amount=this.cartList.reduce((acc,product)=>{ 
      return acc+ product.price * product.item;
    },0);
    this.cartTotal=amount;
    if(amount<100){
      this.discount=0;
    }else if(amount > 100 && amount < 500){
      this.discount=10;
    }else if(amount > 500){
      this.discount=20;
    }else{
      this.discount=0;
    }

    let dis=amount/100;
    
    let discountAmount=dis * this.discount;
    let total=amount-discountAmount;
    this.grandTotal=total;
    // console.log('dis'+dis);
    // console.log('disamt'+discountAmount);
    // console.log('total'+total);
    this.cartCount=this.cartList.length;
  }

  addItem(productId){
    let prod=this.cartList;
    let productExist=prod.find(({id})=> id ==productId);
    if(productExist){
      productExist.item +=1;
    }
    this.getCartTotal();
  }
 
  removeItem(productId){
    let prod=this.cartList;
    // prod=JSON.parse(localStorage.getItem('products'));
    let productExist=prod.find(({id})=> id==productId);
    if(productExist){
      let items=productExist.item; 
      if(items>1){
        productExist.item -=1;
      }else{
        this.cartList=prod.filter(({id})=> id !==productId);
      } 
    } 
    this.getCartTotal(); 
  }
  removeProduct(productId){ 
    this.cartList=this.cartList.filter(({id})=> id!==productId);
    this.getCartTotal();
    this.cartCount=this.cartList.length; 
  }
  clearCart(){
    if(confirm('Are you sure to clear Cart')){
      this.cartList=[];
      localStorage.removeItem('products');
    }
  }


}
