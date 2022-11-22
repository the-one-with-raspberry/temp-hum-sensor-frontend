import { TestBed } from '@angular/core/testing';

import { HumService } from './hum.service';

describe('HumService', () => {
  let service: HumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
