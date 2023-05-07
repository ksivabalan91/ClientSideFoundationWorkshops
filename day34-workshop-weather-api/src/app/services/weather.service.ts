import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Weather } from '../models/weather.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weather!:Weather;
  weatherUpdate = new EventEmitter<void>();

  private appid = environment.apiKey
  private url = environment.endPoint
  
  constructor(private httpClient: HttpClient) {}

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
