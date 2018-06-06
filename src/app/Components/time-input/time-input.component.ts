import {Component, Input, OnInit} from '@angular/core';
import {AmazingTimePickerService} from 'amazing-time-picker';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.css']
})
export class TimeInputComponent implements OnInit {
  @Input() time: Date;

  constructor(private atp: AmazingTimePickerService) {
  }

  ngOnInit() {
  }

  changeTime(time: string) {
    let timeArray = time.split(':');
    this.time.setHours(parseInt(timeArray[0], 10), parseInt(timeArray[1], 10));
  }

  open($event) {

    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(
      time => {
        /// zone.run app.tick detectedChandes setTimeout
        $event.value = time;
        let timeArray = time.split(':');
        this.time.setHours(parseInt(timeArray[0], 10), parseInt(timeArray[1], 10));
      }
    );
  }
}
