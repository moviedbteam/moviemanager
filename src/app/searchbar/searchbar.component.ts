import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../shared/models/movie.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  searchedMovies:MovieModel[] =[];

  constructor(private movieSvc:MovieService) {  }

  ngOnInit() {
    this.movieSvc.getSearchedMovies$()
    .subscribe ( (foundMovies:MovieModel[] ) => this.searchedMovies = foundMovies  );
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
