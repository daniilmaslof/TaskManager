import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from "rxjs/Observable";
import {Task} from "../Models/Task";

@Injectable()
export class UploadTaskService {
  private basePath = '/tasks';

  constructor(private db: AngularFireDatabase) {
  }

  updateTasks(tasks: Task[]) {
    let taskToString = tasks.map(
      (task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          deadline: task.deadline.toString()
        };
      }
    );
    this.db.database.ref('/tasks').remove().then(
      () => {
        console.log(taskToString);
        this.db.database.ref('/tasks').set(taskToString);
      }
    );
  }

  uploadTask(): Observable<Task[]> {
    return this.db.list(this.basePath).valueChanges().map(
      (value: Task[]) => {
        value.map(
          (task) => {
            task.deadline = new Date(task.deadline);
            return new Task(task.id, task.title, task.description, new Date(task.deadline));
          });
        return value;
      }
    );
  }

}
