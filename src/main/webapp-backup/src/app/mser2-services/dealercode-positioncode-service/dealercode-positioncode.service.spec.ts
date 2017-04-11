import { TestBed, inject } from '@angular/core/testing';

import { DealercodePositioncodeService } from './dealercode-positioncode.service';

describe('DealercodePositioncodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealercodePositioncodeService]
    });
  });

  it('should ...', inject([DealercodePositioncodeService], (service: DealercodePositioncodeService) => {
    expect(service).toBeTruthy();
  }));
});
