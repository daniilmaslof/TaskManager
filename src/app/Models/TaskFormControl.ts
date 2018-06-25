import {FormControl} from "@angular/forms";

export class TaskFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages(): string[] {
    let messages: string[] = [];
    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`Вы должны ввести ${this.label}`);
            break;
        }
      }
      return messages;
    }
  }
}
