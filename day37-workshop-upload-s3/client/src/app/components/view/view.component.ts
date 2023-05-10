import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  uploadSub$!: Subscription;
  imageSub$!: Subscription;
  imageData!:any;
  images:string[] = ['dummy data']

  constructor(private fileSvc: FileService) { 
    console.log("view component constructor called")
    this.images = this.fileSvc.getImages();
  }

  ngOnInit() {
    // getting images from s3 bucket
    console.log(" view component init called")
    // subscribed to click on the list of image names to load imageData
    this.imageSub$ =  this.fileSvc.loadImage.subscribe((data)=>this.imageData=data);
  }

  loadImage(img:string){
    this.fileSvc.download(img)
  }

}
