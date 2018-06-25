import {FormGroup, Validators} from "@angular/forms";
import {TaskFormControl} from "./TaskFormControl";

export class TaskFormGroup extends FormGroup {
  constructor() {
    super({
      title: new TaskFormControl('Заголовок Задачи', 'title', '', Validators.required),
      description: new TaskFormControl('Описание Задачи', 'description', '', Validators.required),
      deadline: new TaskFormControl('Дедлайн Задачи', 'deadline', '', Validators.required)
    });
  }

  get taskControl(): TaskFormControl[] {
    return Object.keys(this.controls).map(
      k => this.controls[k] as TaskFormControl);
  }

  getFormValidationMessages(form: any): string[] {
    let messages: string[] = [];
    this.taskControl.forEach(
      c => {
        if ( c.getValidationMessages()) {
          c.getValidationMessages().forEach(
            v => {
              messages.push(v);
            }
          );
        }
      });
    return messages;
  }

}
