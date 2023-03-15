import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-seeallmovie',
  templateUrl: './seeallmovie.component.html',
  styleUrls: ['./seeallmovie.component.css']
})
export class SeeallmovieComponent {

  movies:Array<Movie> =[];
  subscription:any;

  constructor(
    private movieSvc:MovieService,
    private alerteService:AlertService
    
    ) {}

  ngOnInit() {
    this.subscription = this.movieSvc.getMovies$()
      .subscribe(
        (moviesArr:Movie[]) => {
          if(moviesArr.length===0) {
            this.movieSvc.getMoviesFromApi();
          }
          this.movies = moviesArr
          console.log(this.movies);
        });                
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  callTest(str:string) {
    this.alerteService.showAlert("Ajouté aux " + str + "!!!");
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}