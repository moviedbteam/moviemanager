import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { WatchService } from 'src/app/services/watch.service';
import { WishService } from 'src/app/services/wish.service';
import { MovieModel } from '../../models/movie.model';
import { WatchesModel } from '../../models/watches.model';
import { WishesModel } from '../../models/wishes.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OverviewComponent {

  wishMovies:Array<WishesModel> = [];
  subscriptionWishes:any;

  watchMovies:Array<WatchesModel> = [] ;
  subscriptionWatches:any;

  movies:Array<MovieModel>=[];
  // movies:MovieModel[][] =[];
  subscription:any;

  constructor(
    
    private wishSvc:WishService,
    private watchSvc:WatchService,
    public movieSvc:MovieService,
  ) {
    console.log(this)
  }

  ngOnInit() {
    this.subscriptionWishes = this.wishSvc.getWishes$()
      .subscribe(
        (wishesArr:WishesModel[]) => {
          if(wishesArr.length===0) {
            this.wishSvc.getWishMoviesFromApi();
          }
          this.wishMovies = wishesArr

          console.log("this.wishMovies");
          console.log(this.wishMovies);

          for (let wish of this.wishMovies) {
            
            this.subscription = this.movieSvc.getMovies$()
              .subscribe(
                (moviesArr:MovieModel[]) => {
                  if(moviesArr.length===0) {
                    this.movieSvc.getDetailsFromApi(wish.idMovie);
                  }
                  this.movies = moviesArr

                  console.log("this.movies");
                  console.log(this.movies);
                }
              );
          }

        }
      );

    

    this.subscriptionWatches = this.watchSvc.getWatches$()
      .subscribe(
        (watchesArr:WatchesModel[]) => {
          if(watchesArr.length===0) {
            this.watchSvc.getWatchMoviesFromApi();
          }
          this.watchMovies = watchesArr

          console.log("this.watchMovies");
          console.log(this.watchMovies);
        }
      );

    
    

  }

  ngOnDestroy() {
    console.log(this.wishMovies);
    console.log(this.watchMovies);

    this.subscriptionWishes.unsubscribe();
    this.subscriptionWatches.unsubscribe();
    this.subscription.unsubscribe();
  }

}


