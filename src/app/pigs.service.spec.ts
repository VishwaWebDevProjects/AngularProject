import { TestBed } from '@angular/core/testing';

import { PigsService } from './pigs.service';

describe('PigsService', () => {
  let service: PigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
