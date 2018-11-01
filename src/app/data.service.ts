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

}
