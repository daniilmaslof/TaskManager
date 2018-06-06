export class Task {
  public title: string;
  public description: string;
  public deadline: Date;

  constructor(title: string = '', description: string = '', deadline: Date = new Date()) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
  }
}
