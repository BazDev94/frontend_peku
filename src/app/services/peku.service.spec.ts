import { TestBed } from '@angular/core/testing';

import { PekuService } from './peku.service';

describe('PekuService', () => {
  let service: PekuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PekuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
