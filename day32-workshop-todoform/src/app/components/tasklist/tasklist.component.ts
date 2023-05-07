import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit, OnDestroy{
  
  taskList: Task[] = []
  sub$!: Subscription;

  constructor(private taskSvc:TaskService){} 
  
  ngOnInit(){
    const localData =localStorage.getItem('tasks');
    if(localData!=null){
      const storedTasks = JSON.parse(localData)
      storedTasks.map((task: Task) => {
        return new Task(task.description,task.priority,task.dueDate)
      })
      this.taskList = storedTasks;
      this.taskSvc.setTasks(storedTasks);
    }
    this.sub$ = this.taskSvc.updateObservable.subscribe((message:string)=>{
      console.log(message);
      this.taskList = this.taskSvc.getTasks();
    });    
  }  
  
  ngOnDestroy(){
    this.sub$.unsubscribe;
  }

  deleteTask(idx:number){
    this.taskSvc.deleteTask(idx);
  }
  
}
