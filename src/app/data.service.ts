import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCabinets() {
    // return this.localStorage.getItem('cabinets'); // TODO: funktioniert nicht
  }
}
