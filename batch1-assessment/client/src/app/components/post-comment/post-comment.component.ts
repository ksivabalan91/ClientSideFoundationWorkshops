import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

  title!: string;
  form!: FormGroup;

  constructor(private actRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.actRoute.params.subscribe(
      (data) => this.title=data['title']
    )
    this.form = this.fb.group({
      name:this.fb.control<string>('',[Validators.required, Validators.minLength(3)]),
      rating:this.fb.control<number>(0,[Validators.required]),
      comment:this.fb.control<string>('',[Validators.required])
    })
  }

  reloadPage(){

  }
  postComment(){

  }

}
