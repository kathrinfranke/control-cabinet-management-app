import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {
  devices: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.devices = this.data.getLocalStorageData('devices');
  }

  // DELETE ITEM
  onDeleteItem(device_id) {
    if (confirm("Sind Sie sicher, dass Sie das Gerät mit der ID "+device_id+" löschen möchten?")) {
      let index2remove = this.devices.findIndex( deviceitem => deviceitem.id === device_id );
      if (index2remove!==-1) {
        let updatedDevices = this.devices;
        updatedDevices.splice(index2remove,1);
        localStorage.setItem('devices', JSON.stringify(updatedDevices));
      }
    }
  }
}
