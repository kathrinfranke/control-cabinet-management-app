import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabinet-detail',
  templateUrl: './cabinet-detail.component.html',
  styleUrls: ['./cabinet-detail.component.scss']
})
export class CabinetDetailComponent {
  cabinet: any[];
  cabinet_devices: any;

  constructor(private data: DataService, private route: ActivatedRoute) {
    const id = this.route.snapshot.params['id'];
    this.cabinet = this.data.getLocalStorageDataItem('cabinets', id)[0];
    this.cabinet_devices = this.data.getCabinetDevices(this.cabinet['id']);
  }

}
