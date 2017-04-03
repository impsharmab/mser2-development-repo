import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mser2BodyComponent } from './mser2-body.component';

describe('Mser2BodyComponent', () => {
  let component: Mser2BodyComponent;
  let fixture: ComponentFixture<Mser2BodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mser2BodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mser2BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
