import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  games:any[]=[];
  page:number = 0;
  numberOfEntries:number=10
  url = 'http://localhost:8080';

constructor(private http: HttpClient) {}


callApi(){
  const params = new HttpParams().set('limit',this.numberOfEntries).set('offset',this.page)
  this.http.get<any[]>(this.url,{params}).subscribe(
    (dataArr:any[]) => {
      this.games.push(dataArr.map(obj => obj.name))
      console.log(this.games)
    },
    error => console.error(error)
  );
}

getGames(){
  return this.games.slice();
}


}
