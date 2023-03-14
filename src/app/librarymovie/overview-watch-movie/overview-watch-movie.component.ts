import { Component, ViewEncapsulation } from '@angular/core';
import { BackDetailMovie } from 'src/app/detailsheetmovie/models/back-detail-movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { WatchesMovieService } from '../services/watches-movie.service';

@Component({
  selector: 'app-overview-watch-movie',
  templateUrl: './overview-watch-movie.component.html',
  styleUrls: ['./overview-watch-movie.component.css'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class OverviewWatchMovieComponent {

  watchMovies:Array<BackDetailMovie> = [] ;
  subscriptionWatchesMovie:any;

  // moviesWatch:Array<MovieModel>=[];
  // subscriptionMovieWatch:any;

  constructor(
    private watchSvc:WatchesMovieService,
    public movieSvcWatch:MovieService,
  ) {}

  ngOnInit() {

    this.subscriptionWatchesMovie = this.watchSvc.getWatchesMovie$()
      .subscribe(
        (watchesArr:BackDetailMovie[]) => {
          if(watchesArr.length===0) {
            this.watchSvc.getWatchMoviesFromApi();
          }
          this.watchMovies = watchesArr
          console.log(this.watchMovies);
          // for (let watch of this.watchMovies) {
          //   this.movieSvcWatch.getDetailsWatchFromApi(watch.idMovie);
          // }
        }
      );
    
    // this.subscriptionMovieWatch = this.movieSvcWatch.getMovieWatchDetail$()
    // .subscribe(
    //   (movieWatch:MovieModel) => {      
    //     if (movieWatch.id){
    //       this.moviesWatch.push(movieWatch);
    //     }
    //   }
    // );
  }

  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }

  ngOnDestroy() {
    this.subscriptionWatchesMovie.unsubscribe();
    // this.subscriptionMovieWatch.unsubscribe();
  }

}
