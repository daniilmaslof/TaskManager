import {Injectable} from '@angular/core';
import {Store} from "./store";
import {AngularFireDatabase} from "angularfire2/database";
import {UploadTaskService} from "../Service/upload-task.service";
import {Task} from "../Models/Task";

@Injectable()
export class StoreTaskService extends Store<Task[]> {
  constructor(private uploadTask: UploadTaskService) {
    super(null);
    this.downloadTasks();
  }

  // let date = new Date('Sat June 24 2018 18:13:28 GMT+0500 (RTZ 4 (зима))');
  // let tasks = [];
  // for (let i = 0; i < 5; i++) {
  //   tasks.push(new Task(i.toString(), 'i', date));
  // }

  addTask(task: Task): void {
    this.state.unshift(task);
    this.setState(this.state);
  }

  moveTask(prewIndex: number, newIndex: number) {
    if (prewIndex !== newIndex) {
      if (prewIndex < newIndex) {
        for (let i = prewIndex; i <= newIndex - 1; i++) {
          let swap = this.state[i];
          this.state[i] = this.state[i + 1];
          this.state[i + 1] = swap;
        }
      } else {
        for (let i = prewIndex; i > newIndex; i--) {
          let swap = this.state[i];
          this.state[i] = this.state[i - 1];
          this.state[i - 1] = swap;
        }
      }
      this.setState(this.state);
    }
  }

  downloadTasks() {
    this.uploadTask.uploadTask().subscribe(
      tasks => {
        this.setState(tasks);
      });
  }

  unloadTasks() {
    this.uploadTask.updateTasks(this.state);
  }

  editTask(task: Task, index: number) {
    this.state[index] = task;
    console.log(this.state[index]);
    this.setState(this.state);
  }

  deleteTask(index: number) {
    this.state.splice(index, 1);
    this.setState(this.state);
  }
}
