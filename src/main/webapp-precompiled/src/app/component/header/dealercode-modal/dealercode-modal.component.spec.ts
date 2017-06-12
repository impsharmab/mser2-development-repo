import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealercodeModalComponent } from './dealercode-modal.component';

describe('DealercodeModalComponent', () => {
  let component: DealercodeModalComponent;
  let fixture: ComponentFixture<DealercodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealercodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealercodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
