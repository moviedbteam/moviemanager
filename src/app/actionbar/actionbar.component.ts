import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.css']
})
export class ActionbarComponent {

  movies:Array<any> =[];

  constructor(private movieSvc:MovieService) {
    console.log(this); 
  }

  onClickSuivants() {
    this.movieSvc.getMoviesFromApi();
  }

}
