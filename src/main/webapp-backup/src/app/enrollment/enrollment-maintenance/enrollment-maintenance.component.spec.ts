import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentMaintenanceComponent } from './enrollment-maintenance.component';

describe('EnrollmentMaintenanceComponent', () => {
  let component: EnrollmentMaintenanceComponent;
  let fixture: ComponentFixture<EnrollmentMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
