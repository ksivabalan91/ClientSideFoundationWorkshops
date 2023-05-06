import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  shopItems:Item[] = []

  addItemEmitter = new Subject<Item>();

  constructor(private cartSvc:CartServiceService){
    this.shopItems=[      
      new Item("Python Automate Everything","assets/images/python.png"),
      new Item("Aws Beginner Certification","assets/images/aws.png"),
      new Item("Docker Masterclass Course","assets/images/docker.png"),
      new Item("Kubernetes devops Course","assets/images/kubernetes.png")
    ]    
  }
  
  ngOnInit(){  }

  addToCart(idx:number){
    console.log(this.shopItems[idx])
    this.cartSvc.addToCart(this.shopItems[idx]);
  }

}
