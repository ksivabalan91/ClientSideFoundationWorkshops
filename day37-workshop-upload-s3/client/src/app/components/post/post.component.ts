import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  form!: FormGroup;
  imageData = 'https://bucketbucket.sgp1.digitaloceanspaces.com/hotd.jpg'
  isUploaded = false;
  

  @ViewChild('file',{static:true}) imageFileElem!: ElementRef;

  constructor(private fb: FormBuilder, private http: HttpClient, private fileSvc: FileService){}

  ngOnInit() {
    this.form = this.fb.group({
      comments : this.fb.control<string>('',[Validators.required]),
      imageFile : this.fb.control('',[Validators.required])
    })
    this.fileSvc.getAll();
  }

  upload(){
    this.fileSvc.upload(this.form, this.imageFileElem);
    this.isUploaded=true;
    this.form.reset()
  }

}
