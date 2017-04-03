import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mser2ProfileComponent } from './mser2-profile.component';

describe('Mser2ProfileComponent', () => {
  let component: Mser2ProfileComponent;
  let fixture: ComponentFixture<Mser2ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mser2ProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mser2ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
