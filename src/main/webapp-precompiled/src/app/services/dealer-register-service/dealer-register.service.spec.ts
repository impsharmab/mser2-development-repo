import { TestBed, inject } from '@angular/core/testing';

import { DealerRegisterService } from './dealer-register.service';

describe('MserEnrollmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealerRegisterService]
    });
  });

  it('should ...', inject([DealerRegisterService], (service: DealerRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
