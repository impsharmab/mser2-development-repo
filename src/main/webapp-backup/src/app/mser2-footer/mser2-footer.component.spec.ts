import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mser2FooterComponent } from './mser2-footer.component';

describe('Mser2FooterComponent', () => {
  let component: Mser2FooterComponent;
  let fixture: ComponentFixture<Mser2FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mser2FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mser2FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
