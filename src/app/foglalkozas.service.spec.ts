import { TestBed } from '@angular/core/testing';

import { FoglalkozasService } from './foglalkozas.service';

describe('FoglalkozasService', () => {
  let service: FoglalkozasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoglalkozasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
