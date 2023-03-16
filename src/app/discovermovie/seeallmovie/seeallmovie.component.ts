import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seeallmovie',
  templateUrl: './seeallmovie.component.html',
  styleUrls: ['./seeallmovie.component.css']
})
export class SeeallmovieComponent {

  // idMovie:number = 0; //recup de detailsheetmovie : A SUPPRIMER ??
  movies:Array<Movie> =[];

  // Statut des icônes Wish
  _wishStatusIconOn: string = "fa-solid fa-bookmark fa-lg"
  _wishTitleIconOn: string = "Supprimer tous les épisodes de cette saison de la Wish liste"
  _wishStatusIconOff: string = "fa-regular fa-bookmark fa-lg"
  _wishTitleIconOff: string = "Ajouter tous les épisodes de cette saison à la Wish liste"

  // Statut des icônes Watch
  _watchStatusIconOn: string = "fa-solid fa-eye fa-lg"
  _watchTitleIconOn: string = "Restaurer tous les épisodes de cette saison en 'Non Vu'"
  _watchStatusIconOff: string = "fa-regular fa-eye-slash fa-lg"
  _watchTitleIconOff: string = "Marquer tous les épisodes de cette saison comme 'Vus'"


  // Statuts des icones à OFF
  // wishStatusIcon: string = "fa-regular fa-bookmark fa-lg"
  // wishTitleIcon: string = "Ajouter à la Wish liste"
  // watchStatusIcon: string = "fa-solid fa-check fa-lg"
  // watchTitleIcon: string = "Ajouter comme Vu"

  subscriptionMovie:any;

  apiBack = environment.base_url_apiBack;
  apiBackGetDetailsFromApi = '/movie/detail/';

  constructor(
    private movieSvc:MovieService,
    private alerteSvc:AlertService,
    private http:HttpClient,
    ) {}

  async ngOnInit() {
    
    this.subscriptionMovie = await this.movieSvc.getMovies$()
      .subscribe( async (moviesArr:Movie[]) => {
        if(moviesArr.length===0) {
          this.movieSvc.getMoviesFromApi();
        }
        this.movies = moviesArr
        console.log(this.movies);

        for (let movie of this.movies){
          await this.http.get(this.apiBack+this.apiBackGetDetailsFromApi+movie.idMovie)
          .toPromise()      
          .then( (response:any) => {
            console.log(response);
            console.log(movie);
            // INIT statut des icones wish et watch
            if (response.idWish > 0) {
              console.log(response.idWish);
              movie.idWish = response.idWish;
              movie._wishStatusIcon = this._wishStatusIconOn;
              movie._wishTitleIcon = this._wishStatusIconOn;
            } else {
              movie._wishStatusIcon = this._wishStatusIconOff;
              movie._wishTitleIcon = this._wishStatusIconOff;
            };
            if (response.idWatch > 0) {
              console.log(response.idWatch);
              movie.idWatch = response.idWatch;
              movie._watchStatusIcon = this._watchStatusIconOn;
              movie._watchTitleIcon = this._watchStatusIconOn;
            } else {
              movie._watchStatusIcon = this._watchStatusIconOff;
              movie._watchTitleIcon = this._watchStatusIconOff;
            };
          });
          
        }  
        console.log(this.movies);
        // return;
      });

  }

  updateStatusWishIcon(movie:Movie) {
    if (movie._wishStatusIcon === this._wishStatusIconOn) {
      console.log("Appel à this.movieSvc.delWishMovie()");
      this.movieSvc.delWishThisMovie(movie);
      this.setStatusWishIcon(movie, 0)
    }
    else {
      console.log("Appel à this.addWish()");
      this.addWish(movie);
      this.setStatusWishIcon(movie, 1)
    }
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

  setStatusWishIcon(movie:Movie , status: number) {
    if (status) {
      movie._wishStatusIcon = "fa-solid fa-bookmark fa-lg";
      movie._wishTitleIcon = "Supprimer de la Wish liste";
    }
    else {
      movie._wishStatusIcon = "fa-regular fa-bookmark fa-lg";
      movie._wishTitleIcon = "Ajouter à la Wish liste";
    }
  }

  setStatusWatchIcon(movie:Movie , status: number) {
    if (status) {
      movie._watchStatusIcon = "fa-sharp fa-solid fa-circle-check fa-lg";
      movie._watchTitleIcon = "Restaurer en Non Vu";
    }
    else {
      movie._watchStatusIcon = "fa-solid fa-check fa-lg";
      movie._watchTitleIcon = "Ajouter comme Vu";
    }
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  callTest(str:string) {
    this.alerteSvc.showAlert("Ajouté aux " + str + "!!!");
  }

  addWish(movie:Movie) {
    let sendToApi = { idMovie:movie.idMovie, };
    
    this.movieSvc.postWishMovieToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {
        console.log(response.status)
        this.alerteSvc.showAlert("Ajouté à la Wish liste!")
      },
      error: error => console.error(error)
    });
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

  ngOnDestroy() {
    this.subscriptionMovie.unsubscribe();
  }

}