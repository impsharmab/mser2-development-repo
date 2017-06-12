import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutchartComponent } from './payoutchart.component';

describe('PayoutchartComponent', () => {
  let component: PayoutchartComponent;
  let fixture: ComponentFixture<PayoutchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
