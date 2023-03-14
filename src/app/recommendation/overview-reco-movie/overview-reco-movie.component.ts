import { Component, ViewEncapsulation } from '@angular/core';
import { RecoMovie } from '../models/reco-movie.model';
import { RecoMovieService } from '../services/reco-movie.service';

@Component({
  selector: 'app-overview-reco-movie',
  templateUrl: './overview-reco-movie.component.html',
  styleUrls: ['./overview-reco-movie.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewRecoMovieComponent {

  recoMovies:Array<RecoMovie> = [];
  subscriptionRecoMovie:any;

  constructor(
    private recoMovieSvc:RecoMovieService,
  ){}
  
  ngOnInit() {
    
    this.subscriptionRecoMovie = this.recoMovieSvc.getRecoMovie$()
    .subscribe(
      (recoArr:RecoMovie[]) => {        
        if(recoArr.length===0) {
          this.recoMovieSvc.getRecoMovieFromApi();
        }
        this.recoMovies = recoArr
        }
    );
  }
            
  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }
  
  ngOnDestroy() {
    this.subscriptionRecoMovie.unsubscribe();
  }
            
}