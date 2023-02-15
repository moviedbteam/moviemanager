import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../shared/models/movie.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  movies:Array<MovieModel> =[];

  constructor(private movieSvc:MovieService) {
    console.log(this); 
  }

  ngOnInit() {
    this.movieSvc.getMoviesFromApi();
    this.movieSvc.getMovies$()
    .subscribe( (moviesArr:MovieModel[]) => this.movies = moviesArr );
  }

  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

}
