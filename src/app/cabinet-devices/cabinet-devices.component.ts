import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cabinet-devices',
  templateUrl: './cabinet-devices.component.html',
  styleUrls: ['./cabinet-devices.component.scss']
})
export class CabinetDevicesComponent implements OnInit {
  device: any[];
  device_width: number;
  device_height: number;
  cabinets: any[];
  coordinates: any[];

  selected_cabinet: any[];
  cabinetDevices: any[];

  cabinetDetails: HTMLElement;
  cabinetMockup: HTMLElement;
  styleCabinetWidth: number;
  styleCabinetHeight: number;

  // FORM
  cabinetDeviceForm: FormGroup;

  constructor(private data: DataService, private route: ActivatedRoute, private fb: FormBuilder) {
    let id = this.route.snapshot.params['id'];
    this.device = JSON.parse(this.data.getLocalStorageDataItem('devices',id))[0];
    this.device_width = JSON.parse(this.data.getLocalStorageDataItem('devices',id))[0]['width'];
    this.device_height = JSON.parse(this.data.getLocalStorageDataItem('devices',id))[0]['height'];
    // TODO: nur Schränke verfügbarem Platz für Geräte
    this.cabinets = this.data.getSuitableCabinets(this.device['width'],this.device['height']);
    // DISABLE POSITION SELECTED
  }

  ngOnInit() {
    this.cabinetDeviceForm = this.fb.group({
      cabinetSelect: ['none',''],
      coordinateSelect: ['none','']
     });
     this.cabinetDeviceForm.controls.coordinateSelect.disable(); // TODO: schnellste Lösung / geht sicher anders und schöner
  }

  onCabinetChange(cabinet_id) {
   console.log('cabinet select changed | selected cabinet_id: ' + cabinet_id);
   // TODO: clear form fields on change
   this.cabinetDetails = document.getElementById('cabinetDetails') as HTMLElement;
   this.cabinetMockup = document.getElementById('cabinetMockup') as HTMLElement;
   // CABINET SELECTED?
   if (cabinet_id == 'none') {
     console.log('no value selected');
     this.cabinetDetails.classList.add("d-none");
     this.cabinetMockup.classList.add("d-none");
     this.cabinetDeviceForm.controls.coordinateSelect.disable();
    } else {
      // SHOW MOCKUP AND DETAILS
      this.cabinetDetails.classList.remove("d-none");
      this.cabinetMockup.classList.remove("d-none");
      this.cabinetDeviceForm.controls.coordinateSelect.enable();
      // SELECTED CABINET
      this.selected_cabinet = JSON.parse(this.data.getLocalStorageDataItem('cabinets',cabinet_id))[0];
      // ANY DEVICES?
      this.cabinetDevices = this.data.getCabinetDevices(this.selected_cabinet['id']);

      // POSITIONS / COORDINATES
      // - ALL CABINET COORDINATES
      let pos_x = Array(this.selected_cabinet['width']).fill(0).map((a, b) => a + b);
      let pos_y = Array(this.selected_cabinet['height']).fill(0).map((a, b) => a + b);
      // - CABINET COORDINATES
      let coordinates = [];
      let coord_val = [];
      pos_x.forEach(function(x) {
        var x = x;
        pos_y.forEach(function(y) {
          var y = y;
          let coords = {
            x: x,
            y: y
          };
          coord_val.push(coords);
        });
      });
      coordinates.push(JSON.stringify(coord_val));
      // FILTER CABINET COORDINATES FOR VALID DEVICE-POSITIONS
      let filteredCoordinates = JSON.parse(coordinates.toString()).filter(coord => {
        // WIDTHS AND HEIGHTS
        let cabinet_width = this.selected_cabinet['width'];
        let cabinet_height = this.selected_cabinet['height'];
        let device_width = this.device_width;
        let device_height = this.device_width;
        // // COORDINATES
        let filter_coord_x = coord['x'];
        let filter_coord_y = coord['y'];
        // VALID?
        let valid_x = ((filter_coord_x + device_width) <= cabinet_width);
        let valid_y = ((filter_coord_y + device_height) <= cabinet_height);
        // RETURN
        return valid_x && valid_y;
      });

      if (this.cabinetDevices === undefined) {
        console.log('no cabinet devices present - all positions available');
        this.coordinates = filteredCoordinates;
      } else {
        console.log('cabinet devices present');
        // GET ASSIGNED DEVICES
        let assignedDevicesCoordinates = this.data.getAssignedDevicesCoordinates(this.cabinetDevices);
        // REMOVE ASSIGNED DEVICE COORDINATES FROM CABINET COORDINATES
        let filteredDevicesCoordinates = filteredCoordinates.filter(function(item){
          var found = (JSON.stringify(assignedDevicesCoordinates)).indexOf(JSON.stringify(item));
          return found === -1;
        });
        this.coordinates = filteredDevicesCoordinates;
      }
      // STYLES
      let zoomfactor = 7;
      this.styleCabinetWidth = this.selected_cabinet['width'] * zoomfactor;
      this.styleCabinetHeight = this.selected_cabinet['height'] * zoomfactor;
    }
  }

  addDeviceToCabinet() {
    console.log('addDeviceToCabinet');
    let key = 'cabinet_devices';
    // FORM VALUES
    let selected_device = this.device['id'];
    let selected_cabinet = this.cabinetDeviceForm.value.cabinetSelect;
    let selected_position = this.cabinetDeviceForm.value.coordinateSelect;
    // DATA
    let data = {cabinet_id: selected_cabinet, device_id: selected_device, position: selected_position};
    try {
      let cabinet_devices = JSON.parse(localStorage.getItem(key)) || [];
      if (!(cabinet_devices instanceof Array)) { cabinet_devices = [cabinet_devices]; }
      cabinet_devices.push(data);
      localStorage.setItem(key, JSON.stringify(cabinet_devices));
      $('form').prepend('<div class="alert alert-success" role="alert">Das Gerät wurde erfolgreich zugewiesen.</div>');
      setTimeout(function() {
        $('form .alert').fadeOut()
      }, 1500);
      $('form').trigger("reset");
    } catch (e) {
      $('form').prepend('<div class="alert alert-danger" role="alert">Es ist ein Fehler aufgetreten! Die Daten konnten nicht gespeichert werden.</div>');
      setTimeout(function() {
        $('form .alert').fadeOut()
      }, 2000);
      console.error('Error saving to localStorage', e);
    }
  }

}
