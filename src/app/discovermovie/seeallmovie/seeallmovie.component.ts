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

  idMovie:number = 0; //recup de detailsheetmovie : A SUPPRIMER ??
  movies:Array<Movie> =[];

  // Statuts des icones à OFF
  wishStatusIcon: string = "fa-regular fa-bookmark fa-lg"
  wishTitleIcon: string = "Ajouter à la Wish liste"
  watchStatusIcon: string = "fa-solid fa-check fa-lg"
  watchTitleIcon: string = "Ajouter comme Vu"

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
            // INIT statut des iconess wish et watch
            console.log(movie);
            // INIT statut des boutons wish et watch
            if (response.idWish > 0) {
              console.log(response.idWish);
              movie.idWish = response.idWish;
              this.setStatusWishIcon(1) ;
            };
            if (response.idWatch > 0) {
              console.log(response.idWatch);
              movie.idWatch = response.idWatch;
              this.setStatusWatchIcon(1) ;
            };
       
          });
          
        }  
        console.log(this.movies);
        // return;
      });

  }

  updateStatusWishIcon(idMovie:any) {
    if (this.wishStatusIcon.includes('fa-solid')) {
      console.log("Appel à this.movieSvc.delWishMovie()");
      this.movieSvc.delWishMovie();
      this.setStatusWishIcon(0)
    }
    else {
      console.log("Appel à this.addWish()");
      this.addWish();
      this.setStatusWishIcon(1)
    }
  }

  updateStatusWatchIcon(idMovie:any) {
    if (this.watchStatusIcon.includes('fa-circle-check')) {
      console.log("Appel à this.movieSvc.delWatchMovie()");
      this.movieSvc.delWatchMovie();
      this.setStatusWatchIcon(0)
    }
    else {
      console.log("Appel à this.checkWatch()");
      this.checkWatch();
      this.setStatusWatchIcon(1)
    }
  }

  setStatusWishIcon(status: number) {
    if (status) {
      this.wishStatusIcon = "fa-solid fa-bookmark fa-lg";
      this.wishTitleIcon = "Supprimer de la Wish liste";
    }
    else {
      this.wishStatusIcon = "fa-regular fa-bookmark fa-lg";
      this.wishTitleIcon = "Ajouter à la Wish liste";
    }
  }

  setStatusWatchIcon(status: number) {
    if (status) {
      this.watchStatusIcon = "fa-sharp fa-solid fa-circle-check fa-lg";
      this.watchTitleIcon = "Restaurer en Non Vu";
    }
    else {
      this.watchStatusIcon = "fa-solid fa-check fa-lg";
      this.watchTitleIcon = "Ajouter comme Vu";
    }
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  callTest(str:string) {
    this.alerteSvc.showAlert("Ajouté aux " + str + "!!!");
  }

  addWish() {
    let sendToApi = { 
      idMovie:this.idMovie, 
    };
    
    this.movieSvc.postWishMovieToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {
        console.log(response.status)
        this.alerteSvc.showAlert("Ajouté à la Wish liste!")
      },
      error: error => console.error(error)
    });
  }

  checkWatch() {
    let sendToApi = { 
      idMovie:this.idMovie
    };
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