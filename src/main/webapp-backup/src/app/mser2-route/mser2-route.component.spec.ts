import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mser2RouteComponent } from './mser2-route.component';

describe('Mser2RouteComponent', () => {
  let component: Mser2RouteComponent;
  let fixture: ComponentFixture<Mser2RouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mser2RouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mser2RouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
