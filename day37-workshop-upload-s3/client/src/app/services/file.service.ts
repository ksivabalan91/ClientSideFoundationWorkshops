import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, firstValueFrom, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

loadImage = new Subject<{image:string,comments:string}>();
uploadedFile = new Subject<String>();
images:string[]=[];
//! for local host 8080 change this to empty string ""
url = "https://gas-rain-production.up.railway.app";
// url='';

constructor(private http: HttpClient){}

upload(form:FormGroup, imageFileElem: ElementRef){
  console.log("upload called")
  const formData = new FormData();
  formData.set('picture', imageFileElem.nativeElement.files[0])
  formData.set('comments', form.get('comments')?.value)

  this.http.post(this.url+"/api/comment",formData)
  .pipe(
    map(
      (data:any) => { return data['response'] }
      )
    )
  .subscribe(
    response => {
      this.images.push(response)
      this.uploadedFile.next("");
      console.log(this.images)
    }
  );
}

download(img:string){
  console.log("download called")
  this.http.get(this.url+"/api/comment/"+img).pipe(
    map(
      (data:any) => {
        console.log(data)
        return {
          image: data["image"],
          comments: data["comments"],
        }
      }
      )
      ).subscribe(
        (data:any) => {
          this.loadImage.next(data);
        }
        )
      }
      
async getAll() {
  console.log("getAll called");
  try {
    this.images = await lastValueFrom(this.http.get<string[]>(this.url+"/api/comments"));
    console.log("in getAll", this.images);
  } catch (error) {
    console.error("Error getting images", error);
    this.images = [];
  }
}

getImages(){
  return this.images.slice();
}
      

}
