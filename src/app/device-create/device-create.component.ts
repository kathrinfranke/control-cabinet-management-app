import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html'
})

export class DeviceCreateComponent implements OnInit {
  deviceForm: FormGroup;

  constructor(private data: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.deviceForm = this.fb.group({
      id: new FormControl('', [Validators.required, this.validID]),
      width: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30), this.validContent]),
      height: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30), this.validContent])
    });
  }

  // CUSTOM VALIDATORS
  validID = (control: AbstractControl): { [key: string]: boolean } | null => {
    if (this.data.getLocalStorageData('devices') !== null) {
      const resultOfValidation = this.data.getLocalStorageData('devices').filter(cabinet => {
        return cabinet['id'] === control.value;
      });
      if (resultOfValidation.length === 0) {
        return null;
      } else {
        return { nomatch: true };
      }
    } else {
      return null;
    }
  }
  validContent = (control: AbstractControl): { [key: string]: boolean } | null => {
    if ( !isNaN(control.value) ) {
      return null;
    } else {
      return { NaN: true };
    }
  }

  addDevice() {
    const key = 'devices';
    const data = this.deviceForm.value;
    try {
      let device = this.data.getLocalStorageData('devices') || [];
      if (!(device instanceof Array)) { device = [device]; }
      device.push(data);
      this.data.setData('devices', device);
      $('form').prepend('<div class="alert alert-success" role="alert">Das Gerät wurde erfolgreich gespeichert.</div>');
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

}
