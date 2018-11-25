import { Component, OnInit } from '@angular/core';
import { Cabinet } from '../interfaces/cabinet';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cabinet-list',
  templateUrl: './cabinet-list.component.html'
})

export class CabinetListComponent implements OnInit {

  cabinets: Cabinet;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.cabinets = this.data.getLocalStorageData('cabinets');
  }

  // DELETE ITEM
  onDeleteItem(cabinet_id) {
    if (confirm('Sind Sie sicher, dass Sie den Schaltschrank mit der ID ' + cabinet_id + ' löschen möchten?')) {
      // REMOVE FROM CABINET DEVICES
      const cabinetDevices = this.data.getLocalStorageData('cabinet_devices');
      if (cabinetDevices !== null) {
        const updatedCabinetDevices = cabinetDevices.filter(cabinet_device => {
          cabinet_device['cabinet_id'] !== cabinet_id;
        });
        this.data.setData('cabinet_devices', updatedCabinetDevices);
      }

      // DELETE CABINET
      const cabinets = this.data.getLocalStorageData('cabinets');
      const updatedCabinets = cabinets.filter(cabinet => {
        return cabinet['id'] !== cabinet_id;
      });
      this.data.setData('cabinets', updatedCabinets);
    }
  }

}
