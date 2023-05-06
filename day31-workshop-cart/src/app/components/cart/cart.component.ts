import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { Item } from 'src/app/models/item.model';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartItems: CartItem[]=[];

  constructor(private cartSvc:CartServiceService){}

  ngOnInit(){
    this.cartSvc.eventEmitter.subscribe(()=>this.cartItems=this.cartSvc.getCart())
    console.log(this.cartItems)
  }

  delete(idx:number){
    this.cartSvc.deleteItem(idx);
  }



}
