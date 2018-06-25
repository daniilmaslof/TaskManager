import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Task} from "../../../../Models/Task";
import {FormGroup, NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {TaskFormGroup} from "../../../../Models/TaskFormGroup";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  model: Task;
  form: TaskFormGroup = new TaskFormGroup();
  formSubmitted = false;
  constructor(public dialogRef: MatDialogRef<NewTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number, private dialog: MatDialog) {
    this.model = new Task(data);
  }

  onNoClick() {
    this.dialogRef.close();
  }
  submitForm(form: NgForm) {
    this.formSubmitted = true;
  }

  ngOnInit() {
  }

}
