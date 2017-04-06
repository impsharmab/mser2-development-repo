import { TestBed, inject } from '@angular/core/testing';

import { OpcodeSetupService } from './opcode-setup.service';

describe('OpcodeSetupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpcodeSetupService]
    });
  });

  it('should ...', inject([OpcodeSetupService], (service: OpcodeSetupService) => {
    expect(service).toBeTruthy();
  }));
});
