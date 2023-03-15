import { Component, ViewEncapsulation } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-overview-wish-movie',
  templateUrl: './overview-wish-movie.component.html',
  styleUrls: ['./overview-wish-movie.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewWishMovieComponent {
  wishMovies:Array<Movie> = [];
  subscriptionWishesMovie:any;
  constructor(
    public movieSvc:MovieService,
  ){}

  ngOnInit() {
    this.subscriptionWishesMovie = this.movieSvc.getWishesMovie$()
    .subscribe(
      (wishesArr:Movie[]) => {
          if(wishesArr.length===0) {
            this.movieSvc.getWishMoviesFromApi();
          }
          this.wishMovies = wishesArr
          console.log(this.wishMovies);
        }
      );
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }

  ngOnDestroy() {
    this.subscriptionWishesMovie.unsubscribe();
  }

}