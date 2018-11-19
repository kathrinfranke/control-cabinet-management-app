import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from '../data.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html'
})
export class DeviceDetailComponent {

  device: any[];
  assignedCabinet: any;

  constructor(private data: DataService, private route: ActivatedRoute) {
    let id = this.route.snapshot.params["id"];
    this.device = this.data.getLocalStorageDataItem('devices',id)[0];
    if (this.data.getAssignedCabinet(this.device['id']) !== undefined) {
      this.assignedCabinet = JSON.parse(this.data.getAssignedCabinet(this.device['id']))[0];
    }
  }

}
