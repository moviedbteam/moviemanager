import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { WatchService } from 'src/app/services/watch.service';
import { WishService } from 'src/app/services/wish.service';
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

  constructor(
    
    private wishSvc:WishService,
    private watchSvc:WatchService,
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
        }
      );

    this.subscriptionWatches = this.watchSvc.getWatches$()
      .subscribe(
        (watchesArr:WatchesModel[]) => {
          if(watchesArr.length===0) {
            this.watchSvc.getWatchMoviesFromApi();
          }
          this.watchMovies = watchesArr
        }
      );

    console.log(this.wishMovies);
    console.log(this.watchMovies);

  }

  ngOnDestroy() {
    console.log(this.wishMovies);
    console.log(this.watchMovies);

    this.subscriptionWishes.unsubscribe();
    this.subscriptionWatches.unsubscribe();
  }

}


