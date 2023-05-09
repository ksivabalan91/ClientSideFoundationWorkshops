import { HttpClient } from '@angular/common/http';
import { compilePipeFromMetadata } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  form!: FormGroup;
  imageData!: any;

  @ViewChild('file',{static:true}) imageFileElem!: ElementRef;

  constructor(private fb: FormBuilder, private http: HttpClient){}

  ngOnInit(){
    this.form = this.fb.group({
      comments : this.fb.control<string>('angular app comment',[Validators.required]),
      imageFile : this.fb.control('',[Validators.required])
    })
    this.download();
  }

  upload(){
    const formData = new FormData();
    formData.set('picture', this.imageFileElem.nativeElement.files[0])
    formData.set('comments', this.form.get('comments')?.value)

    this.http.post("/api/comment",formData).subscribe(
      response => console.log(response)
    );
  }

  download(){
    console.log("download called")
    lastValueFrom(this.http.get("http://localhost:8080/api/comment/93047958",{responseType:'json'})).then(
      (obj:any)=>{
        this.imageData = obj['picture'];
      }
    )
  }


}
