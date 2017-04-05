import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecallRewardsRulesComponent } from './recall-rewards-rules.component';

describe('RecallRewardsRulesComponent', () => {
  let component: RecallRewardsRulesComponent;
  let fixture: ComponentFixture<RecallRewardsRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecallRewardsRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecallRewardsRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
