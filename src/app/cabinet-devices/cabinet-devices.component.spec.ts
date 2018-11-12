import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetDevicesComponent } from './cabinet-devices.component';

describe('CabinetDevicesComponent', () => {
  let component: CabinetDevicesComponent;
  let fixture: ComponentFixture<CabinetDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinetDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
