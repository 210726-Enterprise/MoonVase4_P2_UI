import { TestBed } from '@angular/core/testing';

import { CityindexService } from './cityindex.service';

describe('CityindexService', () => {
  let service: CityindexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityindexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
