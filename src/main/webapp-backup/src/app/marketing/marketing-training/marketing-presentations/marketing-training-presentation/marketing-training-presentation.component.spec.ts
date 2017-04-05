import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingTrainingPresentationComponent } from './marketing-training-presentation.component';

describe('MarketingTrainingPresentationComponent', () => {
  let component: MarketingTrainingPresentationComponent;
  let fixture: ComponentFixture<MarketingTrainingPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingTrainingPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingTrainingPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
