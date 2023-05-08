import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weather } from 'src/app/models/weather.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit, OnDestroy{

  weather: Weather= new Weather('','',0,0,0);
  cityName!: string;
  sub$!: Subscription;

  constructor(private apiSvc: ApiService,private router:Router, private actRoute: ActivatedRoute){
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnInit(){
    this.sub$  = this.actRoute.params.subscribe((params)=>{
      this.apiSvc.apiCall(params['cityName']).then((obj:any)=>{
        this.weather = new Weather(
          obj['name'],
          obj['weather'][0]['description'],
          obj['main']['temp'],
          obj['main']['pressure'],
          obj['main']['humidity'],
        )
      }).catch(
        (err) => {
          console.error(err);
          this.router.navigate(['']);
        }
      )
    })

  }



}
