import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { platformBrowser } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponentComponent implements OnInit{
  
  form!: FormGroup;

  constructor(private apiSvc: ApiService, private fb: FormBuilder, private router: Router){}
  
  ngOnInit(){
    this.form = this.fb.group({
      searchTerm: this.fb.control<string>('',[Validators.required,Validators.minLength(3)])
    })
  }

  search(){
    // console.log(this.form.value['searchTerm'])
    // console.log(this.form.get('searchTerm')?.value)
    this.apiSvc.search(this.form.value['searchTerm'].trim()).then(
      data => {
        this.apiSvc.setReviews(data);
        console.log(data)
        this.router.navigate(['/reviews'])
      },
      error => {
        this.router.navigate(['/reviews']);
      }
    );
  }
  
  isValid(){
    const validInput = this.form.value['searchTerm'].trim().length<3?true:false;    
    // const length = this.form.value['searchTerm'].trim().length
    // console.log(
      //   "Form Valid: "+!this.form.valid
      //   +"\nInput Length:"+length
      //   +"\nInput Valid:"+validInput
      //   +"\nForm touched:"+this.form.touched
      //   )      
      return validInput && this.form.dirty;
  }
  isInputValid(){
    const validInput = this.form.value['searchTerm'].trim().length<3?true:false;    
    return validInput;
  }

}
