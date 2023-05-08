import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Subject, catchError, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  offset:number = 0;
  numberOfEntries:number=10;
  url = 'http://localhost:8080/api/games';
  refresh$ = new Subject<void>();

constructor(private http: HttpClient) {
}

callApi(){
  console.log("api called")
  const params = new HttpParams().set('limit',this.numberOfEntries).set('offset',this.offset)
  console.log(this.url+params);
  return lastValueFrom(
  this.http.get<string[]>(this.url,{params}).pipe(
    map((dataArr:any[]) => dataArr.map(obj => obj.name) as string[]),
    catchError( error => {
      console.error(error);
      return ([]);
    })
  )
  )
}
}
