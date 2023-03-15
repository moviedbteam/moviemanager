import { Component } from '@angular/core';
import { BackDetailMovie } from 'src/app/models/back-detail-movie.model';
import { DetailMovieService } from 'src/app/services/detail-movie.service';

@Component({
  selector: 'app-searchbarmovie',
  templateUrl: './searchbarmovie.component.html',
  styleUrls: ['./searchbarmovie.component.css']
})
export class SearchbarmovieComponent {

  searchedMovies:BackDetailMovie[] =[];

  constructor(
    public detailMovieSvc:DetailMovieService,
    ) {  }

  ngOnInit() {
    this.detailMovieSvc.getSearchedMovies$()
    .subscribe ( (foundMovies:BackDetailMovie[] ) => this.searchedMovies = foundMovies  );
  }

  onKeyupInput(userSearch:string) {
    console.log(userSearch);
    if (userSearch.length == 0) {
      this.detailMovieSvc.setSearchMovies$([]);
    }
    else {
      this.detailMovieSvc.searchMoviesFromApi(userSearch);
    }
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  ngOnDestroy() {
    this.detailMovieSvc.setSearchMovies$([]);
  }

}
