import { TestBed } from '@angular/core/testing';

import { CsoportService } from './csoport.service';

describe('CsoportService', () => {
  let service: CsoportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsoportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
