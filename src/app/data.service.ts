import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getLocalStorageData(key = 'cabinets') {
    let localStorageData = JSON.parse(localStorage.getItem(key));
    return localStorageData;
  }

  getLocalStorageDataItem(key = 'cabinets',id) {
    let findme = this.getLocalStorageData(key).findIndex( item => item.id === id );
    if (findme !== -1) {
      let localStorageDataItem = JSON.parse(localStorage.getItem(key)).splice(findme,1);
      localStorageDataItem = JSON.stringify(localStorageDataItem);
      return localStorageDataItem;
    } else {
      // TODO: richtiges error handling einbinden
      console.log('record not found');
      window.location.href = '/';
    }
  }

}
