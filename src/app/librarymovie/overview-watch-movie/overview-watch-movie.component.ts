import { Component, ViewEncapsulation } from '@angular/core';
import { BackDetailMovie } from 'src/app/models/back-detail-movie.model';
import { DetailMovieService } from 'src/app/services/detail-movie.service';

@Component({
  selector: 'app-overview-watch-movie',
  templateUrl: './overview-watch-movie.component.html',
  styleUrls: ['./overview-watch-movie.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewWatchMovieComponent {
  watchMovies:Array<BackDetailMovie> = [] ;
  subscriptionWatchesMovie:any;
  constructor(
    public detailMovieSvc:DetailMovieService,
  ) {}

  ngOnInit() {
    this.subscriptionWatchesMovie = this.detailMovieSvc.getWatchesMovie$()
      .subscribe(
        (watchesArr:BackDetailMovie[]) => {
          if(watchesArr.length===0) {
            this.detailMovieSvc.getWatchMoviesFromApi();
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