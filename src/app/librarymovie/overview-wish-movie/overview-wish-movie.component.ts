import { Component, ViewEncapsulation } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { AlertService } from 'src/app/services/alert.service';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-overview-wish-movie',
  templateUrl: './overview-wish-movie.component.html',
  styleUrls: ['./overview-wish-movie.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewWishMovieComponent {

  wishMovies:Array<Movie> = [];
  
  // Statut icône Watch
  _watchStatusIconOn: string = "fa-solid fa-eye fa-lg"
  _watchTitleIconOn: string = "Restaurer 'Non Vu'"
  _watchStatusIconOff: string = "fa-regular fa-eye-slash fa-lg"
  _watchTitleIconOff: string = "Marquer comme 'Vus'"

  subscriptionWishesMovie:any;

  constructor(
    public movieSvc:MovieService,
    private alerteSvc:AlertService,
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
          
          for (let wishMovie of this.wishMovies){
          
            // INIT icone watch
            if (wishMovie.idWatch !== null) {
              wishMovie._watchStatusIcon = this._watchStatusIconOn;
              wishMovie._watchTitleIcon = this._watchTitleIconOn;
            } else {
              wishMovie._watchStatusIcon = this._watchStatusIconOff;
              wishMovie._watchTitleIcon = this._watchTitleIconOff;
            };
          
          }
          
          return;
        });
  }

  updateStatusWatchIcon(movie:Movie) {
    if (movie._watchStatusIcon === this._watchStatusIconOn) {
      console.log("Appel à this.movieSvc.delWatchMovie()");
      this.movieSvc.delWatchThisMovie(movie);
      this.setStatusWatchIcon(movie, 0)
    }
    else {
      console.log("Appel à this.checkWatch()");
      this.checkWatch(movie);
      this.setStatusWatchIcon(movie, 1)
    }
  }

  setStatusWatchIcon(movie:Movie , status: number) {
    if (status) {
      movie._watchStatusIcon = this._watchStatusIconOn;
      movie._watchTitleIcon = this._watchTitleIconOn;
    }
    else {
      movie._watchStatusIcon = this._watchStatusIconOff;
      movie._watchTitleIcon = this._watchTitleIconOff;
    }
  }

  callTest(str:string) {
    this.alerteSvc.showAlert("Ajouté aux " + str + "!!!");
  }

  checkWatch(movie:Movie) {
    let sendToApi = { idMovie:movie.idMovie,};
    console.log(sendToApi);

    this.movieSvc.postWatchMovieToApi(sendToApi)
    .subscribe({
      next: (response:any) => {
        console.log(response.status)
        if(response.status = "201") {
          
        }
      },
      error: error => console.error(error)
    });
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }

  ngOnDestroy() {
    this.subscriptionWishesMovie.unsubscribe();
  }

}