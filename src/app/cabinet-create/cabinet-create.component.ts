import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-cabinet-create',
  templateUrl: './cabinet-create.component.html'
})

export class CabinetCreateComponent implements OnInit {
  cabinetForm: FormGroup;

  constructor(private data: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.cabinetForm = this.fb.group({
      id: new FormControl('', [Validators.required, this.validID]),
      width: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30), this.validContent]),
      height: new FormControl('', [Validators.required, Validators.min(1), Validators.max(50), this.validContent])
    });
  }

  // CUSTOM VALIDATORS
  validID = (control: AbstractControl): { [key: string]: boolean } | null => {
    if (this.data.getLocalStorageData('cabinets') !== null) {
      const resultOfValidation = this.data.getLocalStorageData('cabinets').filter(cabinet => {
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


  addCabinet() {
    const key = 'cabinets';
    const data = this.cabinetForm.value;
    try {
      let cabinet = this.data.getLocalStorageData('cabinets') || [];
      if (!(cabinet instanceof Array)) {
         cabinet = [cabinet];
      }
      cabinet.push(data);
      this.data.setData('cabinets', cabinet);
      $('form').prepend('<div class="alert alert-success" role="alert">Der Schaltschrank wurde erfolgreich gespeichert.</div>');
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
