import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subscription, lastValueFrom, map } from 'rxjs';
import { Weather } from '../models/weather.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weather!:Weather;
  subWea$!:Subscription;
  weatherUpdate = new EventEmitter<void>();

  private appid = environment.apiKey
  private url = environment.endPoint
  
  constructor(private httpClient: HttpClient) {}


  callApi2(cityName:string){
    const params = new HttpParams()
      .set('q',cityName)
      .set('appid',this.appid)
      .set('units','metric')
      
      this.subWea$ = this.httpClient.get(this.url,{ params }).subscribe({
        next:(data)=>{console.log(data)},
        error:(error: HttpErrorResponse)=>{console.error(error)},
        complete:() => { this.subWea$.unsubscribe()}
      })
  }

  async callApi(cityName:string){
    const params = new HttpParams()
      .set('q',cityName)
      .set('appid',this.appid)
      .set('units','metric')


    this.weather = await lastValueFrom(
      this.httpClient.get<Weather>(this.url, { params }).pipe(
        map(
          (data: any) => {
            return new Weather(
              data['name'],
              data['weather'][0]['description'],
              data['main']['temp'],
              data['main']['pressure'],
              data['main']['humidity']
            );
          }
        )
      )
    );
    console.log(this.weather)
    this.weatherUpdate.emit();
  }

  getWeather(){
    const weatherCopy = this.weather
    return weatherCopy;
  }
}
