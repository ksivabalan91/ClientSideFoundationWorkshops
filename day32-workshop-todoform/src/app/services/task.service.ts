import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks:Task[] = [];
  count=0;
  updateObservable = new Subject<string>();

  constructor() { }

  addTask(task:Task){
    this.tasks.push(task);    
    this.updateObservable.next("task added");
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
  }
  
  getTasks(){
    return this.tasks.slice();
  }
  
  setTasks(storedTasks: Task[]){
    this.tasks=storedTasks;
  }

  deleteTask(idx:number){
    this.tasks.splice(idx,1);
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
    this.updateObservable.next("Task deleted")
  }

  clearTasks(){
    localStorage.clear();
    this.tasks = [];
    this.updateObservable.next("Tasks cleared")
  }


}
