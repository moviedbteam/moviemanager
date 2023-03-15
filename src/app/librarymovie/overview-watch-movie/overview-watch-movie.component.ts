import { Component, ViewEncapsulation } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-overview-watch-movie',
  templateUrl: './overview-watch-movie.component.html',
  styleUrls: ['./overview-watch-movie.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewWatchMovieComponent {
  watchMovies:Array<Movie> = [] ;
  subscriptionWatchesMovie:any;
  constructor(
    public movieSvc:MovieService,
  ) {}

  ngOnInit() {
    this.subscriptionWatchesMovie = this.movieSvc.getWatchesMovie$()
      .subscribe(
        (watchesArr:Movie[]) => {
          if(watchesArr.length===0) {
            this.movieSvc.getWatchMoviesFromApi();
          }
          this.watchMovies = watchesArr
          console.log(this.watchMovies);
        }
      );    
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }

  ngOnDestroy() {
    this.subscriptionWatchesMovie.unsubscribe();
  }

}