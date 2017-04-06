import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingProgramComponent } from './marketing-program.component';

describe('MarketingProgramComponent', () => {
  let component: MarketingProgramComponent;
  let fixture: ComponentFixture<MarketingProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
