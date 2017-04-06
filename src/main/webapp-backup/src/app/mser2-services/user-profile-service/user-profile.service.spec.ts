import { TestBed, inject } from '@angular/core/testing';

import { UserProfileService } from './user-profile.service';

describe('UseProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProfileService]
    });
  });

  it('should ...', inject([UserProfileService], (service: UserProfileService) => {
    expect(service).toBeTruthy();
  }));
});
