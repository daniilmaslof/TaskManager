import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Task} from '../../../../Models/Task';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TaskFormGroup} from "../../../../Models/TaskFormGroup";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  model: Task;
  form: TaskFormGroup = new TaskFormGroup();
  formSubmitted = false;
  constructor(public dialogRef: MatDialogRef<EditTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    this.model = Object.assign({}, data);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
