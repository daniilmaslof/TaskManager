import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from "../../../../Models/Task";
import {FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @ViewChild('formTask') formTask: FormGroup;
  model: Task;

  constructor(public dialogRef: MatDialogRef<NewTaskComponent>, private dialog: MatDialog) {
    this.model = new Task();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {

  }

  ngOnInit() {
  }

}
