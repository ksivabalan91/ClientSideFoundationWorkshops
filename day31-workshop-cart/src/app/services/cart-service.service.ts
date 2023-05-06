import { EventEmitter, Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cart:CartItem[]=[];

  eventEmitter = new EventEmitter<void>();

  constructor() { }

  addToCart(item:Item){

    let foundItem = false;

    this.cart.forEach(
      cartItem=>{
      if(cartItem.item.name === item.name){
        cartItem.quantity++;
        foundItem = true;
      }
      }
    );

    if(!foundItem){
      this.cart.push(new CartItem(item, 1));
    }    
    this.eventEmitter.emit();
    console.log('added');
  }

  getCart(){
    return this.cart.slice();
  }

  deleteItem(idx:number){
    this.cart.splice(idx,1);
    this.eventEmitter.emit();
  }


}
