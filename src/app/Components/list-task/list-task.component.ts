import {Component, OnInit} from '@angular/core';
import {Task} from '../../Models/Task';
import {DropSortableEvent} from "../../Directives/drag-sortable.directive";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {NewTaskComponent} from "./task/new-task/new-task.component";
import {EditTaskEvent} from "./task/task.component";
import {StoreTaskService} from "../../Store/store-task.service";
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('*=> *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
          ]))
        ]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1.0}),
          ]))
        ]), {optional: true}),
      ])
    ])
  ]
})
export class ListTaskComponent implements OnInit {

  tasks: Task[];
  updateList = true;
  loading = true;

  getClassMap(deadlineTask: Date): Object {
    const millisecondsInDay = 86400000;
    return {
      'bg-approach': ((new Date()).getTime()) > (deadlineTask.getTime() - 3 * millisecondsInDay),
      'bg-exceeding': (new Date()).getTime() > deadlineTask.getTime()
    };
  }

  constructor(public dialog: MatDialog, public storeTaskService: StoreTaskService) {
  }

  addTask(lengthTasks: number) {
    let dialogRef = this.dialog.open(NewTaskComponent, {
      data: lengthTasks,
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

  trackById(id: number, item: Task) {
    return item.id;
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
