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
    this.cabinet_counter = Object.keys(this.data.getLocalStorageData('cabinets')).length;
    this.device_counter = Object.keys(this.data.getLocalStorageData('devices')).length;
  }

  ngOnInit() {
  }

}
