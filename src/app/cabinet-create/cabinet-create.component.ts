import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import * as $ from 'jquery';

@Component({
  selector: 'app-cabinet-create',
  templateUrl: './cabinet-create.component.html',
  styleUrls: ['./cabinet-create.component.scss']
})

export class CabinetCreateComponent {

    // FORM
    cabinetForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, Validators.min(10), Validators.max(30)]),
      height: new FormControl('', [Validators.required, Validators.min(10), Validators.max(50)])
    });

    addCabinet() {
      console.log('add new cabinet');
      // ---------- SAVE TO LOCAL STORAGE ----------
      let key = 'cabinets';
      let data = this.cabinetForm.value;
      try {
        let cabinet = JSON.parse(localStorage.getItem('cabinets')) || [];
        if (!(cabinet instanceof Array)) {
           cabinet = [cabinet];
        }
        cabinet.push(data);
        localStorage.setItem('cabinets', JSON.stringify(cabinet));
        console.log(localStorage.getItem('cabinets'));
        $('form').prepend('<div class="alert alert-success" role="alert">Der Schaltschrank wurde erfolgreich gespeichert.</div>');
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
    } // END addCabinet()

}
