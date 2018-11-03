import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCabinets() {
    let cabinets = JSON.parse(localStorage.getItem('cabinets'));
    return cabinets;
  }

  getCabinetDetail(id) {
    let findme = this.getCabinets().findIndex( cabinetitem => cabinetitem.id === id );
    if (findme !== -1) {
      let cabinet = JSON.parse(localStorage.getItem('cabinets')).splice(findme,1);
      cabinet = JSON.stringify(cabinet);
      return cabinet;
    } else {
      // TODO: richtiges error handling einbinden
      console.log('record not found');
      window.location.href = '/schaltschraenke';
    }
  }

}
