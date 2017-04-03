import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mser2LoginComponent } from './mser2-login.component';

describe('Mser2LoginComponent', () => {
  let component: Mser2LoginComponent;
  let fixture: ComponentFixture<Mser2LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mser2LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mser2LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
