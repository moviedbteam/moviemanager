import { Component } from '@angular/core';
import { DetailMovieService } from 'src/app/services/detail-movie.service';

@Component({
  selector: 'app-actionbarmovie',
  templateUrl: './actionbarmovie.component.html',
  styleUrls: ['./actionbarmovie.component.css']
})
export class ActionbarmovieComponent {

  movies:Array<any> =[];

  constructor(public detailMovieSvc:DetailMovieService,) {
    console.log(this); 
  }

  onClickSuivants() {
    this.detailMovieSvc.getMoviesFromApi();
  }

}
