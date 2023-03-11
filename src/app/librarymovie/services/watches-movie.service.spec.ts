import { TestBed } from '@angular/core/testing';

import { WatchesMovieService } from './watches-movie.service';

describe('WatchesMovieService', () => {
  let service: WatchesMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchesMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
