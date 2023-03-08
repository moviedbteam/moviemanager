import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MovieModel } from '../models/movie.model';

@Component({
  selector: 'app-seeallmovie',
  templateUrl: './seeallmovie.component.html',
  styleUrls: ['./seeallmovie.component.css']
})
export class SeeallmovieComponent {

  movies:Array<MovieModel> =[];
  subscription:any;

  constructor(private movieSvc:MovieService) {
    console.log(this);
  }

  ngOnInit() {
    this.subscription =
        this.movieSvc.getMovies$()
            .subscribe(
                (moviesArr:MovieModel[]) => {
                  if(moviesArr.length===0) {
                    this.movieSvc.getMoviesFromApi();
                  }
                  this.movies = moviesArr
                });
  }

  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}