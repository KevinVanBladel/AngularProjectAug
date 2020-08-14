import { TestBed } from '@angular/core/testing';

import { trainingService } from './training.service';

describe('trainingService', () => {
  let service: trainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(trainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
