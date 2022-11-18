import { TestBed } from '@angular/core/testing';

import { CelsiusService } from './celsius.service';

describe('CelsiusService', () => {
  let service: CelsiusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelsiusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
