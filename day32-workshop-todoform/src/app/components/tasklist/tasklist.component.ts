import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit{

  taskList: Task[] = []

  constructor(private taskSvc:TaskService){}
  
  ngOnInit(){
    this.taskSvc.updateObservable.subscribe((message:string)=>{
      console.log(message);
      this.taskList = this.taskSvc.getTasks();
    })
  }

}
