import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetDetailComponent } from './cabinet-detail.component';

describe('CabinetDetailComponent', () => {
  let component: CabinetDetailComponent;
  let fixture: ComponentFixture<CabinetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
