import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html'
})

export class DeviceCreateComponent {
    // FORM
    deviceForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30)]),
      height: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30)])
    });

    addDevice() {
      let key = 'devices';
      let data = this.deviceForm.value;
      try {
        let device = JSON.parse(localStorage.getItem('devices')) || [];
        if (!(device instanceof Array)) { device = [device]; }
        device.push(data);
        localStorage.setItem('devices', JSON.stringify(device));
        $('form').prepend('<div class="alert alert-success" role="alert">Das Gerät wurde erfolgreich gespeichert.</div>');
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
