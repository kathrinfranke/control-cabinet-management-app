import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cabinet-list',
  templateUrl: './cabinet-list.component.html'
})

export class CabinetListComponent implements OnInit {

  cabinets: any[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.cabinets = this.data.getLocalStorageData('cabinets');
  }

  // DELETE ITEM
  onDeleteItem(cabinet_id) {
    if (confirm("Sind Sie sicher, dass Sie den Schaltschrank mit der ID "+cabinet_id+" löschen möchten?")) {
      // REMOVE FROM CABINET DEVICES
      let cabinetDevices = this.data.getLocalStorageData('cabinet_devices');
      if (cabinetDevices !== null) {
        let updatedCabinetDevices = cabinetDevices.filter(cabinet_device => {
          return cabinet_device['cabinet_id'] != cabinet_id;
        });
        localStorage.setItem('cabinet_devices',JSON.stringify(updatedCabinetDevices));
      }

      // DELETE CABINET
      let cabinets = this.data.getLocalStorageData('cabinets');
      let updatedCabinets = cabinets.filter(cabinet => {
        return cabinet['id'] != cabinet_id;
      });
      localStorage.setItem('cabinets',JSON.stringify(updatedCabinets));
    }
  }

}
