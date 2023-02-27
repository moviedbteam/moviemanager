import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { WatchService } from 'src/app/services/watch.service';
import { MovieModel } from '../../models/movie.model';
import { WatchesModel } from '../../models/watches.model';

@Component({
  selector: 'app-overview-watch',
  templateUrl: './overview-watch.component.html',
  styleUrls: ['./overview-watch.component.css'],
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class OverviewWatchComponent {

  watchMovies:Array<WatchesModel> = [] ;
  subscriptionWatches:any;

  moviesWatch:Array<MovieModel>=[];
  subscriptionMovieWatch:any;

  constructor(
    private watchSvc:WatchService,
    public movieSvcWatch:MovieService,
  ) {
    console.log(this)
  }

  ngOnInit() {

    this.subscriptionWatches = this.watchSvc.getWatches$()
      .subscribe(
        (watchesArr:WatchesModel[]) => {
          if(watchesArr.length===0) {
            this.watchSvc.getWatchMoviesFromApi();
          }
          this.watchMovies = watchesArr
          console.log("this.watchMovies");
          console.log(this.watchMovies);

          let boucle = 1;
          for (let watch of this.watchMovies) {
            this.movieSvcWatch.getDetailsWatchFromApi(watch.idMovie);
            console.log("boucle "+boucle);
            boucle++;
          }

        }
      );
    
    this.subscriptionMovieWatch = this.movieSvcWatch.getMovieWatchDetail$()
    .subscribe(
      (movieWatch:MovieModel) => {      
        this.moviesWatch.push(movieWatch);

        console.log("movieWatch");
        console.log(movieWatch);
        console.log("this.moviesWatch");
        console.log(this.moviesWatch);
        
      }
    );
    

  }

  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  ngOnDestroy() {
    console.log(this.watchMovies);

    this.subscriptionWatches.unsubscribe();
    this.subscriptionMovieWatch.unsubscribe();
  }

}
