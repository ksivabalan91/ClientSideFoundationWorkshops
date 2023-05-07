import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: []
})
export class ListComponent implements OnInit {

  games:string[]=[];
  sub$!: Subscription;
  
  constructor(private apiSvc: ApiService) { }

  ngOnInit() {
  } 

  next(){    
  }
  previous(){    
  }

}
