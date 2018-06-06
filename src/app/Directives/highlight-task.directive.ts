import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

@Directive({
  selector: '[appHighlightTask]'
})
export class HighlightTaskDirective implements OnChanges {
  @Input() deadlineTask: Date;
  millisecondsInDay = 86400000;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    console.log(this.deadlineTask);
    console.log(new Date().getTime() - this.deadlineTask.getTime());
    if ((new Date()).getTime() < this.deadlineTask.getTime()) {
      if ((new Date()).getTime() + 3 * this.millisecondsInDay > this.deadlineTask.getTime()) {
        this.el.nativeElement.style.background = '#ffcdd2';
      } else {
      }
    } else {
      this.el.nativeElement.style.background = '#b71c1c';
    }
  }


}
