import { TestBed, inject } from '@angular/core/testing';

import { OpcodesetupService } from './opcodesetup.service';

describe('OpcodesetupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpcodesetupService]
    });
  });

  it('should ...', inject([OpcodesetupService], (service: OpcodesetupService) => {
    expect(service).toBeTruthy();
  }));
});
