import { Component } from '@angular/core';
import {MovieModel} from "../../models/movie.model";
import {MovieService} from "../../../services/movie.service";

@Component({
  selector: 'app-seeall',
  templateUrl: './seeall.component.html',
  styleUrls: ['./seeall.component.css']
})
export class SeeallComponent {

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
