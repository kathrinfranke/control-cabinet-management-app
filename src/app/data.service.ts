import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }

  getLocalStorageData(key = 'cabinets') {
    return JSON.parse(localStorage.getItem(key));
  }

  getLocalStorageDataItem(key = 'cabinets', id) {
    const findme = this.getLocalStorageData(key).findIndex( item => item.id === id );
    if (findme !== -1) {
      let localStorageDataItem = JSON.parse(localStorage.getItem(key)).splice(findme, 1);
      localStorageDataItem = localStorageDataItem;
      return localStorageDataItem;
    } else {
      // TODO: richtiges error handling einbinden
      console.log('record not found');
      // window.location.href = '/';
    }
  }

  // CABINET DEVICES
  getCabinetDevices(cabinet_id) {
    const key = 'cabinet_devices';
    const cabinet_devices = this.getLocalStorageData(key);
    if (cabinet_devices === null) {
      console.log('no cabinet_devices');
    } else {
      const result = [];
      cabinet_devices.forEach(function(cabinet_device) {
        if (cabinet_device['cabinet_id'] === cabinet_id) {
          result.push(cabinet_device);
        }
      });
      return result;
    }
  }

  numberOfCabinetDevices(cabinet_id) {
    const n = this.getCabinetDevices(cabinet_id) === undefined ? 0 : this.getCabinetDevices(cabinet_id).length;
    return n > 0 ? n : '(keine)';
  }

  // CHECK IF DEVICE IS ALREADY ASSIGNED TO CABINET
  assignableCheck(device_id) {
    const cabinetDevices = this.getLocalStorageData('cabinet_devices');
    if (cabinetDevices) {
      const assigned = cabinetDevices.findIndex(c => c.device_id === device_id);
      return assigned === -1;
    } else {
      return true;
    }
  }

  // CABINET DEVICES
  // - ASSIGNED CABINET
  getAssignedCabinet(device_id) {
    const key = 'cabinet_devices';
    const cabinet_devices = this.getLocalStorageData(key);
    if (cabinet_devices === null) {
      console.log('no cabinet_devices');
    } else {
      const findme = cabinet_devices.findIndex( item => item.device_id === device_id );
      if (findme !== -1) {
        let localStorageDataItem = JSON.parse(localStorage.getItem(key)).splice(findme, 1);
        localStorageDataItem = JSON.stringify(localStorageDataItem);
        return localStorageDataItem;
      }
    }
  }
  // - ASSIGNED CABINET
  getAssignedDevicesCoordinates(cabinet_devices) {
    if (cabinet_devices === null) {
      console.log('no cabinet_devices');
    } else {
      const assignedCoordinates = [];
      // TODO: fertigstellen, bugs beheben
      cabinet_devices.forEach(cabinet_device => {
        // DEVICE DATA
        const deviceData = this.getLocalStorageDataItem('devices', cabinet_device['device_id'])[0];
        // POSITION
        const pos_x = cabinet_device['position']['x'];
        const pos_y = cabinet_device['position']['y'];
        // DEVICE COORDINATES
        const device_width = deviceData['width'];
        const device_height = deviceData['height'];
        for (let _w = pos_x; _w < (device_width + pos_x); _w++) {
          const position_x = _w;
          for (let _h = pos_y; _h < (device_height + pos_y); _h++) {
            const position_y = _h;
            const coords = {
              x: position_x,
              y: position_y
            };
            assignedCoordinates.push(coords);
          }
        }
      });
      return assignedCoordinates;
    }
  }

  // SUITABLE CABINETS
  getSuitableCabinets(device_width, device_height) {
    const all_cabinets = this.getLocalStorageData('cabinets');
    const suitables = all_cabinets.filter(cabinet => {
      return ( (cabinet.height >= device_height) && (cabinet.width >= device_width) );
    });
    return suitables;
  }

  setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

}
