import { TestBed } from '@angular/core/testing';

import { ActiviteitService } from './activiteit.service';

describe('ActiviteitService', () => {
  let service: ActiviteitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiviteitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
