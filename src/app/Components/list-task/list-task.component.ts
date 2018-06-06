import {Component, OnInit} from '@angular/core';
import {Task} from '../../Models/Task';
import {DropSortableEvent} from "../../Directives/drag-sortable.directive";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {NewTaskComponent} from "./task/new-task/new-task.component";
import {EditTaskEvent} from "./task/task.component";
import {StoreTaskService} from "../../Store/store-task.service";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks: Task[];
  updateList = true;
  loading = true;

  constructor(public dialog: MatDialog, public storeTaskService: StoreTaskService) {
  }

  addTask() {
    let dialogRef = this.dialog.open(NewTaskComponent, {
      panelClass: 'dialogNewTask'
    } as MatDialogConfig<any>);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateList = false;
        this.storeTaskService.addTask(result);
      }
    });
  }

  unloadTasks() {
    this.loading = true;
    this.updateList = true;
    this.storeTaskService.unloadTasks();
  }

  ngOnInit() {
    this.storeTaskService.state$.subscribe(
      tasks => {
        if (tasks) {
          this.tasks = tasks;
          this.loading = false;
        }
      }
    );
  }

  editTask(event: EditTaskEvent) {
    this.updateList = false;
    this.storeTaskService.editTask(event.task, event.index);
  }

  deleteTask(event: number) {
    this.updateList = false;
    this.storeTaskService.deleteTask(event);
  }

  onDropSortable(event: DropSortableEvent) {
    console.log(event);
    this.storeTaskService.moveTask(event.prewIndex, event.newIndex);
    this.updateList = false;
  }

}
