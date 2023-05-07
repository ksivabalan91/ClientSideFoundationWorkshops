import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  cityName:string='';
  weatherSub$!: Subscription;

  @Input()
  weather!:Weather;

  constructor(private weatherSvc: WeatherService) { }
  ngOnDestroy(): void {
    this.weatherSub$.unsubscribe();
  }

  ngOnInit() {
    this.weatherSub$ = this.weatherSvc.weatherUpdate.subscribe(
      ()=>{
        this.weather=this.weatherSvc.getWeather();
      }
    )
  }


  nameCity(event:any){
    this.cityName = event.target.value;
  }

  callApi(){
    console.log(this.cityName);
    this.weatherSvc.callApi(this.cityName);
  }

}

