import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mser2HeaderComponent } from './mser2-header.component';

describe('Mser2HeaderComponent', () => {
  let component: Mser2HeaderComponent;
  let fixture: ComponentFixture<Mser2HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mser2HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mser2HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
