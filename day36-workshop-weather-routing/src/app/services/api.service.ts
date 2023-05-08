import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  cities:string[] =['Singapore','London','Venice','Melbourne'];

  appid:string = environment.apiKey;
  url: string = environment.endPoint;
  weather!:Weather;
  refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {    
  }

  async apiCall(cityName: string){
    const params = new HttpParams()
    .set('q',cityName)
    .set('appid',this.appid)
    .set('units','metric')

    return await lastValueFrom(this.http.get<Weather>(this.url,{params}))
  }

  getCities(){
    return this.cities.slice();
  }
  deleteCity(idx:number){
    this.cities.splice(idx,1);
    this.refresh$.next();
  }

  addCity(city: string){
    
    let isPresent = false;
    
    this.cities.forEach((iCity)=>{
      if(iCity.toLowerCase()===city.toLowerCase()){
        isPresent=true;
      }
    })

    if(!isPresent){
      this.cities.push(city);
      this.refresh$.next();
    }
  }


}
