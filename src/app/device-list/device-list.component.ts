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

      // TODO: cabinet_devices-einträge löschen
      alert('Diese Funktion wird überarbeitet und ist daher vorübergehend deaktiviert');
      return false;

      let index2remove = this.devices.findIndex( deviceitem => deviceitem.id === device_id );
      if (index2remove!==-1) {
        let updatedDevices = this.devices;
        updatedDevices.splice(index2remove,1);
        localStorage.setItem('devices', JSON.stringify(updatedDevices));
      }
    }
  }
}
