import { TestBed, inject } from '@angular/core/testing';

import { Mser2LoginServiceService } from './mser2-login-service.service';

describe('Mser2LoginServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Mser2LoginServiceService]
    });
  });

  it('should ...', inject([Mser2LoginServiceService], (service: Mser2LoginServiceService) => {
    expect(service).toBeTruthy();
  }));
});
