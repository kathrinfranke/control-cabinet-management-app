import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cabinet-devices',
  templateUrl: './cabinet-devices.component.html',
  styleUrls: ['./cabinet-devices.component.scss']
})
export class CabinetDevicesComponent implements OnInit {
  id: number[];
  device: any[];
  device_width: number;
  device_height: number;
  cabinets: any[];
  coordinates: any[];

  selected_cabinet: any;

  cabinetDevices: any[];
  assignable: boolean;

  cabinetDetails: HTMLElement;
  cabinetMockup: HTMLElement;
  styleZoomFactor: number;
  styleCabinetWidth: number;
  styleCabinetHeight: number;

  // FORM
  cabinetDeviceForm: FormGroup;

  constructor(private data: DataService, private route: ActivatedRoute, private fb: FormBuilder) {
    // DEVICE
    this.id = this.route.snapshot.params['id'];
    this.device = this.data.getLocalStorageDataItem('devices', this.id)[0];
    this.device_width = this.device['width'];
    this.device_height = this.device['height'];
    // CABINET
    this.cabinets = this.data.getSuitableCabinets(this.device['width'], this.device['height']);
    this.styleZoomFactor = 7;
  }

  ngOnInit() {
    this.cabinetDeviceForm = this.fb.group({
      cabinetSelect: ['none', ''],
      coordinateSelect: ['none', '']
     });
     this.cabinetDeviceForm.controls.coordinateSelect.disable(); // TODO: schnellste Lösung / geht sicher anders und schöner
   }

  onCabinetChange(cabinet_id) {
    this.cabinetMockup = document.getElementById('cabinetMockup') as HTMLElement;
    // REMOVE PREVIOUS ELEMENT
    const oldDevicePlacement = document.getElementById('devicePlacement');
    if (oldDevicePlacement !== null) {
     oldDevicePlacement.parentNode.removeChild(oldDevicePlacement);
    }
    // RESET FORM
    this.cabinetDeviceForm.reset({
      cabinetSelect: cabinet_id,
      coordinateSelect: 'none'
    });
    // CABINET SELECTED?
    if (cabinet_id === 'none') {
     console.log('no value selected');
     this.cabinetMockup.classList.add('d-none');
     this.cabinetDeviceForm.controls.coordinateSelect.disable();
    } else {
      // SHOW MOCKUP AND DETAILS
      this.cabinetMockup.classList.remove('d-none');
      this.cabinetDeviceForm.controls.coordinateSelect.enable();
      // SELECTED CABINET
      this.selected_cabinet = this.data.getLocalStorageDataItem('cabinets', cabinet_id)[0];
      // ANY DEVICES?
      this.cabinetDevices = this.data.getCabinetDevices(this.selected_cabinet['id']);
      // POSITIONS / COORDINATES
      // - GET ALL CABINET COORDINATES
      const cabinet_width = this.selected_cabinet['width'];
      const cabinet_height = this.selected_cabinet['height'];
      // - CABINET COORDINATES
      const coordinates = [];
      for (let _w = 0; _w < cabinet_width; _w++) {
        const x = _w;
        for (let _h = 0; _h < cabinet_height; _h++) {
          const y = _h;
          const coords = {
            x: x,
            y: y
          };
          coordinates.push(coords);
        }
      }
      // FILTER CABINET COORDINATES FOR VALID DEVICE-POSITIONS
      const validDeviceCoordinates = coordinates.filter(coord => {
        // DEVICE WIDTHS AND HEIGHTS
        const device_width = this.device_width;
        const device_height = this.device_height;
        // COORDINATES
        const filter_coord_x = coord['x'];
        const filter_coord_y = coord['y'];
        // VALID?
        const valid_x = ((filter_coord_x + device_width) <= cabinet_width);
        const valid_y = ((filter_coord_y + device_height) <= cabinet_height);
        // RETURN
        return valid_x && valid_y;
      });
      // KEINE GERÄTE VORHANDEN? -> ALLE POSITIONEN VERFÜGBAR
      if (this.cabinetDevices === undefined) {
        this.coordinates = validDeviceCoordinates;
      // VERFÜGBARE KOORDINATEN ERMITTELN
      } else {
        const assignedDevicesCoordinates = this.data.getAssignedDevicesCoordinates(this.cabinetDevices);
        const availableDeviceCoordinates = this.getAvailableCoordinates(validDeviceCoordinates, assignedDevicesCoordinates);
        this.coordinates = availableDeviceCoordinates;
      }
      // STYLES
      this.styleCabinetWidth = this.selected_cabinet['width'] * this.styleZoomFactor;
      this.styleCabinetHeight = this.selected_cabinet['height'] * this.styleZoomFactor;
    }
  }

  getAvailableCoordinates(availableCoords, assignedCoords) {
    const finalCoordinates = [];
    for (const i in availableCoords) {
      const pos_x = availableCoords[i]['x'];
      const pos_y = availableCoords[i]['y'];
      const coords2check = [];
      for (let _w: number = pos_x; _w < (this.device_width + pos_x); _w++) {
        const position_x = _w;
        for (let _h: number = pos_y; _h < (this.device_height + pos_y); _h++) {
          const position_y = _h;
          const coords = {
            x: position_x,
            y: position_y
          };
          coords2check.push(coords);
        } // END y
      } // END x
      // CHECK IF DEVICE COORDINATES ARE AVAILABLE
      const coordinateCheck = this.fitsToCabinetCheck(assignedCoords, coords2check);
      if (coordinateCheck === true) {
        if (JSON.stringify(finalCoordinates).indexOf(JSON.stringify(coords2check[0])) === -1) {
          finalCoordinates.push(coords2check[0]);
        }
      }
    }
    return finalCoordinates;
  }

  fitsToCabinetCheck(assignedCoords, coords) {
    let is_valid = true;
    coords.forEach(function(c) {
      const remove = JSON.stringify(assignedCoords).indexOf(JSON.stringify(c));
      if (remove !== -1) {
        is_valid = false;
      }
    });
    return is_valid;
  }


  addDeviceToCabinet() {
    const key = 'cabinet_devices';
    // FORM VALUES
    const selected_device = this.device['id'];
    const selected_cabinet = this.cabinetDeviceForm.value.cabinetSelect;
    const selected_position = this.cabinetDeviceForm.value.coordinateSelect;
    // DATA
    const data = {cabinet_id: selected_cabinet, device_id: selected_device, position: selected_position};
    try {
      let cabinet_devices = this.data.getLocalStorageData(key) || [];
      if (!(cabinet_devices instanceof Array)) { cabinet_devices = [cabinet_devices]; }
      cabinet_devices.push(data);
      this.data.setData(key, cabinet_devices);
      $('form').prepend('<div class="alert alert-success" role="alert">Das Gerät wurde erfolgreich zugewiesen.</div>');
      setTimeout(function() {
        $('form .alert').fadeOut();
      }, 1500);
      $('form').trigger('reset');
    } catch (e) {
      $('form').prepend('<div class="alert alert-danger" role="alert">Es ist ein Fehler aufgetreten! Die Daten konnten nicht gespeichert werden.</div>');
      setTimeout(function() {
        $('form .alert').fadeOut();
      }, 2000);
      console.error('Error saving to localStorage', e);
    }
  }

  setCabinetDeviceStyles(device_id, position) {
    const device = this.data.getLocalStorageDataItem('devices', device_id)[0];
    const styles = {
      'width':  (device['width'] * this.styleZoomFactor) + 'px',
      'height': (device['height'] * this.styleZoomFactor) + 'px',
      'left':   (position['x'] * this.styleZoomFactor) + 'px',
      'bottom': (position['y'] * this.styleZoomFactor) + 'px'
    };
    return styles;
  }

  onPositionChange(coord_value) {
    // REMOVE PREVIOUS ELEMENT
    const oldDevicePlacement = document.getElementById('devicePlacement');
    if (oldDevicePlacement !== null) {
      oldDevicePlacement.parentNode.removeChild(oldDevicePlacement);
    }
    // ADD NEW ELEMENT
    const position = this.cabinetDeviceForm.value.coordinateSelect;
    const newDevicePlacement = document.createElement('span');
    newDevicePlacement.setAttribute('id', 'devicePlacement');
    newDevicePlacement.style.width = (this.device_width * this.styleZoomFactor) + 'px';
    newDevicePlacement.style.height = (this.device_height * this.styleZoomFactor) + 'px';
    newDevicePlacement.style.left = (position['x'] * this.styleZoomFactor) + 'px';
    newDevicePlacement.style.bottom = (position['y'] * this.styleZoomFactor) + 'px';
    newDevicePlacement.style.position = 'absolute';
    newDevicePlacement.style.background = 'green';
    document.getElementById('cabinetMockup').getElementsByClassName('cabinet-mockup--body')[0].appendChild(newDevicePlacement);
  }

}
