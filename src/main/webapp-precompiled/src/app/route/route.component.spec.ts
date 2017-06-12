import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoutingModule } from './route.component';

describe('Mser2RouteComponent', () => {
  let component: AppRoutingModule;
  let fixture: ComponentFixture<AppRoutingModule>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRoutingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRoutingModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
