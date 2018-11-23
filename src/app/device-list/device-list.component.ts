import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {
  devices: any;
  assignedCabinets: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.devices = this.data.getLocalStorageData('devices');
  }

  displayAssignedCabinet(device_id) {
    let assignedCabinet = this.data.getAssignedCabinet(device_id);
    if (assignedCabinet !== undefined) {
      return JSON.parse(assignedCabinet)[0]['cabinet_id'];
    }
  }
  // DELETE ITEM
  onDeleteItem(device_id) {
    if (confirm("Sind Sie sicher, dass Sie das Gerät mit der ID "+device_id+" löschen möchten?")) {
      // REMOVE FROM CABINET DEVICES
      let cabinetDevices = this.data.getLocalStorageData('cabinet_devices');
      if (cabinetDevices !== null) {
        let updatedCabinetDevices = cabinetDevices.filter(cabinet_device => {
          return cabinet_device['device_id'] != device_id;
        });
        this.data.setData('cabinet_devices', updatedCabinetDevices);
      }

      // DELETE DEVICE
      let devices = this.data.getLocalStorageData('devices');
      let updatedDevices = devices.filter(device => {
        return device['id'] != device_id;
      });
      this.data.setData('devices', updatedDevices);
    }
  }
}
