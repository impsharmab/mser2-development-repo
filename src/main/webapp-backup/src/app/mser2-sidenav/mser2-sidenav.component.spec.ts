import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mser2SidenavComponent } from './mser2-sidenav.component';

describe('Mser2SidenavComponent', () => {
  let component: Mser2SidenavComponent;
  let fixture: ComponentFixture<Mser2SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mser2SidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mser2SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
