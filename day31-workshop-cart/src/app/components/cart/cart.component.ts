import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { Item } from 'src/app/models/item.model';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{
  
  cartItems: CartItem[]=[];
  sub$!: Subscription;

  constructor(private cartSvc:CartServiceService){}
  
  ngOnInit(){
    this.sub$ = this.cartSvc.eventEmitter.subscribe(()=>this.cartItems=this.cartSvc.getCart());
    console.log(this.cartItems)
  }
  ngOnDestroy(){
    this.sub$.unsubscribe;
  }
  delete(idx:number){
    this.cartSvc.deleteItem(idx);
  }



}
