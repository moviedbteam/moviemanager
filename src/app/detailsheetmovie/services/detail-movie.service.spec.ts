import { TestBed } from '@angular/core/testing';

import { DetailMovieService } from './detail-movie.service';

describe('DetailMovieService', () => {
  let service: DetailMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
