import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-actionbarmovie',
  templateUrl: './actionbarmovie.component.html',
  styleUrls: ['./actionbarmovie.component.css']
})
export class ActionbarmovieComponent {

  movies:Array<any> =[];

  constructor(private movieSvc:MovieService) {
    console.log(this); 
  }

  onClickSuivants() {
    this.movieSvc.getMoviesFromApi();
  }

}
