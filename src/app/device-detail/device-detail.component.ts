import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from '../data.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html'
})
export class DeviceDetailComponent implements OnInit {

  device: any[];

  constructor(private data: DataService, private route: ActivatedRoute) {
    let id = this.route.snapshot.params["id"];
    this.device = JSON.parse(this.data.getLocalStorageDataItem('devices',id))[0];
  }

  ngOnInit() {
  }

}
