import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcodeSetupComponent } from './opcode-setup.component';

describe('OpcodeSetupComponent', () => {
  let component: OpcodeSetupComponent;
  let fixture: ComponentFixture<OpcodeSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcodeSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcodeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
