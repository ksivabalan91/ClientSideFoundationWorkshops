import { Item } from "./item.model";

export class CartItem{
    item!: Item;
    quantity: number = 0;

    constructor(item:Item,quantity:number=0){
        this.item = item;
        this.quantity = quantity;
    }
}