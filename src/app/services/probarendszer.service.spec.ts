import { TestBed } from '@angular/core/testing';

import { ProbaRendszerService } from './probarendszer.service';

describe('ProbarendszerService', () => {
  let service: ProbaRendszerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProbaRendszerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
