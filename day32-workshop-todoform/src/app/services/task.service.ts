import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks:Task[] = [];
  updateObservable = new Subject<string>();

  constructor() { }

  addTask(task:Task){
    this.tasks.push(task);
    this.updateObservable.next("task added");
  }

  getTasks(){
    return this.tasks.slice();
  }


}
