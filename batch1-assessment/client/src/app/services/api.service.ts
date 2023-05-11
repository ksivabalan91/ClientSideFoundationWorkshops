import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/Review.model';
import { lastValueFrom } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  resultSet!: Review[];

  constructor(private http: HttpClient, private router: Router) { }

  search(searchTerm:string){
    const params = new HttpParams().set("query",searchTerm);
    return lastValueFrom(this.http.get<Review[]>("/api/search",{params}))
  }

  getReviews(){
    return this.resultSet.slice();
  }

  setReviews(reviews: Review[]){
    this.resultSet=reviews;
  }
}
