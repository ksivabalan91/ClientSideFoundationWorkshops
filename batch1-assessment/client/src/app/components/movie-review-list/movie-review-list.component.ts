import { Component, OnDestroy, OnInit } from '@angular/core';
import { Review } from 'src/app/models/Review.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-review-list',
  templateUrl: './movie-review-list.component.html',
  styleUrls: ['./movie-review-list.component.css']
})
export class MovieReviewListComponent implements OnInit, OnDestroy {

  reviewList: Review[] = [];

  constructor(private apiSvc: ApiService) { }
  ngOnDestroy(): void {
    this.reviewList = [];
  }

  ngOnInit() {
    this.reviewList = this.apiSvc.getReviews();
  }

  commentForm(title: string){
    console.log(title)
  }

}
