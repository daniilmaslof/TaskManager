import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Task} from "../../../Models/Task";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {EditTaskComponent} from "./edit-task/edit-task.component";
import index from "@angular/cli/lib/cli";

export interface EditTaskEvent {
  task: Task;
  index: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() index: number;
  @Output() deleteTask: EventEmitter<number> = new EventEmitter();
  @Output() editTask: EventEmitter<EditTaskEvent> = new EventEmitter();
  cardOpen = false;
  nameButton = ['Посмотреть', 'Закрыть'];

  constructor(public dialog: MatDialog) {
  }

  clickTask() {
    this.cardOpen = !this.cardOpen;
  }

  delete() {
    this.deleteTask.emit(this.index);
  }

  openDialog() {
    let dialogRef = this.dialog.open(EditTaskComponent, {
      data: this.task,
      panelClass: 'dialog-no-padding-panel'
    } as MatDialogConfig<any>);
    dialogRef.afterClosed().subscribe(task => {
      if (task) {
        console.log(task);
        this.editTask.emit({task: task, index: this.index});
      }
    });
  }


  ngOnInit() {

  }

}
