import { Component, ViewEncapsulation } from '@angular/core';
import { BackDetailMovie } from 'src/app/models/back-detail-movie.model';
import { DetailMovieService } from 'src/app/services/detail-movie.service';

@Component({
  selector: 'app-overview-wish-movie',
  templateUrl: './overview-wish-movie.component.html',
  styleUrls: ['./overview-wish-movie.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewWishMovieComponent {
  wishMovies:Array<BackDetailMovie> = [];
  subscriptionWishesMovie:any;
  constructor(
    public detailMovieSvc:DetailMovieService,
  ){}

  ngOnInit() {
    this.subscriptionWishesMovie = this.detailMovieSvc.getWishesMovie$()
    .subscribe(
      (wishesArr:BackDetailMovie[]) => {        
          if(wishesArr.length===0) {
            this.detailMovieSvc.getWishMoviesFromApi();
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