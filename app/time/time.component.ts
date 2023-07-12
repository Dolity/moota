import { Component, OnInit } from '@angular/core';
import { DataPassService } from '../data-pass.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
  template: `{{result}} {{timer}}`
})
export class TimeComponent implements OnInit {



  now!: number;
  date1 = new Date(Date.now())

  result = this.date1.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  timer : any;

  constructor(private dataP : DataPassService) {
    setInterval(() => {
      this.now = Date.now();
      this.timer = new Date(this.now).toLocaleTimeString('th-TH', {
          hour : 'numeric',
          minute : 'numeric'
      })+" น."
      this.dataP.dataPass = this.result +' '+ this.timer;
    }, 1);


  }



  ngOnInit(): void {
  }

}
