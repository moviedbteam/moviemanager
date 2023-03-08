import { Component, ViewEncapsulation } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { WishService } from 'src/app/services/wish.service';
import { MovieModel } from '../../discovermovie/models/movie.model';
import { WishesMovie } from '../models/wishes-movie.model';

@Component({
  selector: 'app-overview-wish-movie',
  templateUrl: './overview-wish-movie.component.html',
  styleUrls: ['./overview-wish-movie.component.css'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class OverviewWishMovieComponent {

  wishMovies:Array<WishesMovie> = [];
  subscriptionWishesMovie:any;

  moviesWish:Array<MovieModel>=[];
  subscriptionMovieWish:any;

  constructor(
    private wishSvc:WishService,
    public movieSvcWish:MovieService,
  ){}

  ngOnInit() {
    
    this.subscriptionWishesMovie = this.wishSvc.getWishesMovie$()
    .subscribe(
      (wishesArr:WishesMovie[]) => {        
          if(wishesArr.length===0) {
            this.wishSvc.getWishMoviesFromApi();
          }
          this.wishMovies = wishesArr
          for (let wish of this.wishMovies) {
            this.movieSvcWish.getDetailsWishFromApi(wish.idMovie);
          }
        }
      );
    
    this.subscriptionMovieWish = this.movieSvcWish.getMovieWishDetail$()
      .subscribe(
        (movieWish:MovieModel) => {
          if (movieWish.id ){
            this.moviesWish.push(movieWish);
          }
        }
      );
  }

  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }

  ngOnDestroy() {
    this.subscriptionWishesMovie.unsubscribe();
    this.subscriptionMovieWish.unsubscribe();
  }


}
