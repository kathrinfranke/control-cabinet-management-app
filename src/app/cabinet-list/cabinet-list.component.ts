import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cabinet-list',
  templateUrl: './cabinet-list.component.html',
  styleUrls: ['./cabinet-list.component.scss']
})

export class CabinetListComponent implements OnInit {

  cabinets: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    // this.data.getCabinets().subscribe(
    //   data => this.cabinets = data
    // );
  }

}
