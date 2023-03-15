import { Component } from '@angular/core';
import { BackDetailMovie } from 'src/app/models/back-detail-movie.model';
import { AlertService } from 'src/app/services/alert.service';
import { DetailMovieService } from 'src/app/services/detail-movie.service';

@Component({
  selector: 'app-seeallmovie',
  templateUrl: './seeallmovie.component.html',
  styleUrls: ['./seeallmovie.component.css']
})
export class SeeallmovieComponent {

  movies:Array<BackDetailMovie> =[];
  subscription:any;

  constructor(
    public detailMovieSvc:DetailMovieService,
    private alerteService:AlertService
    
    ) {console.log(this);}

  ngOnInit() {
    this.subscription = this.detailMovieSvc.getMovies$()
      .subscribe(
        (moviesArr:BackDetailMovie[]) => {
          if(moviesArr.length===0) {
            this.detailMovieSvc.getMoviesFromApi();
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
