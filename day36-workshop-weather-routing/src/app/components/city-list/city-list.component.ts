import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit, OnDestroy {

  cityList:string[]=[]
  inputCity = '';
  sub$!: Subscription;

  @ViewChild('cityelement',{static:true}) cityelement!: ElementRef;

  constructor(private apiSvc: ApiService, private router: Router){}
  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }

  ngOnInit(){
    this.cityList=this.apiSvc.getCities();
    this.sub$ = this.apiSvc.refresh$.subscribe(()=>this.cityList=this.apiSvc.getCities())
  }

  goTo(city:string){
    this.router.navigate([city,'weather'])    
  }  

  cityInput(event:any){
    this.inputCity=event.target.value;
  }

  addCity(){
    if(this.inputCity!=''){
      this.apiSvc.addCity(this.inputCity);
      // clear input field
      this.cityelement.nativeElement.value='';
    }
  }
  deleteCity(idx:number){
    this.apiSvc.deleteCity(idx);
  }
}
