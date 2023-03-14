import { Component } from '@angular/core';
import { BackDetailMovie } from 'src/app/detailsheetmovie/models/back-detail-movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-searchbarmovie',
  templateUrl: './searchbarmovie.component.html',
  styleUrls: ['./searchbarmovie.component.css']
})
export class SearchbarmovieComponent {

  searchedMovies:BackDetailMovie[] =[];

  constructor(private movieSvc:MovieService) {  }

  ngOnInit() {
    this.movieSvc.getSearchedMovies$()
    .subscribe ( (foundMovies:BackDetailMovie[] ) => this.searchedMovies = foundMovies  );
  }

  onKeyupInput(userSearch:string) {
    console.log(userSearch);
    if (userSearch.length == 0) {
      this.movieSvc.setSearchMovies$([]);
    }
    else {
      this.movieSvc.searchMoviesFromApi(userSearch);
    }
  }

  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  ngOnDestroy() {
    this.movieSvc.setSearchMovies$([]);
  }

}
