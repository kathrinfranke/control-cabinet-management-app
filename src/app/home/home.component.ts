import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cabinet_counter: any;
  device_counter: any;

  constructor(private data: DataService) {
    if (this.data.getLocalStorageData('cabinets') === null) {
      this.cabinet_counter = 'keine';
    } else {
      this.cabinet_counter = Object.keys(this.data.getLocalStorageData('cabinets')).length;
    }
    if (this.data.getLocalStorageData('devices') === null) {
      this.device_counter = 'keine';
    } else {
      this.device_counter = Object.keys(this.data.getLocalStorageData('devices')).length;
    }
  }

  ngOnInit() {
  }

}
