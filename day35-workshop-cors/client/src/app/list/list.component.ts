import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  games:string[]=['Assassins creed','Arkham Knight'];
  @Input()
  pageSize:number =10;
  sub$!: Subscription;
  counter = 0;
  
  constructor(private apiSvc: ApiService) {
  }
  
  ngOnInit() {
    this.apiSvc.callApi().then(value => this.games = value);
    this.apiSvc.refresh$.subscribe(
      () => {this.apiSvc.callApi().then(value => this.games = value);}
    )
    this.pageSize = this.apiSvc.numberOfEntries;
  }

  pageSizeSelect(event:any){
    this.pageSize=event.target.value;
    this.apiSvc.numberOfEntries=this.pageSize;
    this.apiSvc.offset=0;
    this.counter=0;
    this.apiSvc.refresh$.next();
  }

  next(){
    this.counter++;
    this.apiSvc.offset = Number(this.apiSvc.offset) + Number(this.apiSvc.numberOfEntries);
    this.apiSvc.refresh$.next();
  }
  previous(){
    this.counter--;
    this.apiSvc.offset = Number(this.apiSvc.offset) - Number(this.apiSvc.numberOfEntries);
    this.apiSvc.refresh$.next();
  }

}
