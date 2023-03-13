import { TestBed } from '@angular/core/testing';

import { WishesMovieService } from './wishes-movie.service';

describe('WishesMovieService', () => {
  let service: WishesMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishesMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
