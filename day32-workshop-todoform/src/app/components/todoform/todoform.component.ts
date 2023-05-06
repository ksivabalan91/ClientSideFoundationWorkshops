import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css']
})
export class TodoformComponent implements OnInit {

  form!:FormGroup;

  constructor(private taskSvc: TaskService, private fb:FormBuilder){
  }

  ngOnInit(){
    this.form = this.fb.group({
      description:this.fb.control<string>('',[Validators.required,Validators.minLength(5)]),
      priority:this.fb.control<number>(3,[Validators.required]),
      dueDate: this.fb.control<Date>(new Date(),[Validators.required,this.dateInPastValidator])
    });
  }

  hasError(field:any){
    let isValid = this.form.get(field)?.dirty && this.form.get(field)?.invalid;
    return isValid;
  }

  submit(){
    const task = this.form.value as Task;
    this.taskSvc.addTask(task);
  }

  dateInPastValidator(control: AbstractControl): {[key: string]: any} | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return {'dateInPast': true};
    }
    return null;
  }
  

}
