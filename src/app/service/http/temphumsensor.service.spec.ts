import { TestBed } from '@angular/core/testing';

import { TemphumsensorService } from './temphumsensor.service';

describe('TemphumsensorService', () => {
  let service: TemphumsensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemphumsensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
