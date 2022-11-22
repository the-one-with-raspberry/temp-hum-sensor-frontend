import { TestBed } from '@angular/core/testing';

import { FarenService } from './faren.service';

describe('FarenService', () => {
  let service: FarenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
