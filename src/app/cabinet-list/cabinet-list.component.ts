import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cabinet-list',
  templateUrl: './cabinet-list.component.html',
  styleUrls: ['./cabinet-list.component.scss']
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
      let index2remove = this.cabinets.findIndex( cabinetitem => cabinetitem.id === cabinet_id );
      if (index2remove!==-1) {
        let updatedCabinets = this.cabinets;
        updatedCabinets.splice(index2remove,1);
        localStorage.setItem('cabinets', JSON.stringify(updatedCabinets));
      }
    }
  }

}
