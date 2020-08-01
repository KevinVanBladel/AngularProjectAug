import { TestBed } from '@angular/core/testing';

import { WedstrijdService } from './wedstrijd.service';

describe('WedstrijdService', () => {
  let service: WedstrijdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WedstrijdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
