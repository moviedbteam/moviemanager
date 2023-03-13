import { Component, ViewEncapsulation } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { WatchService } from 'src/app/services/watch.service';
import { MovieModel } from '../../discovermovie/models/movie.model';
import { WatchesMovie } from '../models/watches-movie.model';
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

  watchMovies:Array<WatchesMovie> = [] ;
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
        (watchesArr:WatchesMovie[]) => {
          if(watchesArr.length===0) {
            this.watchSvc.getWatchMoviesFromApi();
          }
          this.watchMovies = watchesArr
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
