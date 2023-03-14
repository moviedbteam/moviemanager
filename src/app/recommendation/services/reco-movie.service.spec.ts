import { TestBed } from '@angular/core/testing';

import { RecoMovieService } from './reco-movie.service';

describe('RecoMovieService', () => {
  let service: RecoMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
