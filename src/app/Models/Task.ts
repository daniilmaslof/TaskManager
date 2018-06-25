export class Task {
  public taskDescriptionShow: boolean = false;
  public id: number;
  public title: string;
  public description: string;
  public deadline: Date;
  constructor(id: number = 0, title: string = '', description: string = '', deadline: Date = new Date()) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.id = id ;
  }
}
