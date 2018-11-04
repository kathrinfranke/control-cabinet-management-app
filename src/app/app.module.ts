// MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from "@angular/material/icon";
import { StorageServiceModule } from 'angular-webstorage-service';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { HomeComponent } from './home/home.component';
// - CABINETS
import { CabinetListComponent } from './cabinet-list/cabinet-list.component';
import { CabinetCreateComponent } from './cabinet-create/cabinet-create.component';
import { CabinetDetailComponent } from './cabinet-detail/cabinet-detail.component';
// - DEVICES
import { DeviceCreateComponent } from './device-create/device-create.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  // SCHALTSCHRÄNKE
  {
    path:       'schaltschraenke',
    component:  CabinetListComponent
  },
  {
    path:       'schaltschraenke/:id',
    component:  CabinetDetailComponent
  },
  // GERÄTE
  {
    path:       'geraete',
    component:  DeviceListComponent
  },
  {
    path:       'geraete/:id',
    component:  DeviceDetailComponent
  }
  // ERROR PAGES
  // { path: '**', redirectTo: '/' + AppConfig.routes.error404 }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CabinetListComponent,
    CabinetCreateComponent,
    CabinetDetailComponent,
    DeviceCreateComponent,
    DeviceListComponent,
    DeviceDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    MatIconModule,
    StorageServiceModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
