import { TestBed } from '@angular/core/testing';

import { EsemenyService } from './esemeny.service';

describe('EsemenyService', () => {
  let service: EsemenyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsemenyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
