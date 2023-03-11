import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { WatchService } from 'src/app/services/watch.service';
import { WishService } from 'src/app/services/wish.service';
import { MovieDetailService } from '../services/movie-detail.service';

@Component({
  selector: 'app-detailmovie',
  templateUrl: './detailmovie.component.html',
  styleUrls: ['./detailmovie.component.css']
})
export class DetailmovieComponent {
  
  idMovie:number = 0;
  // idCollection:number = 0;
  viewingPlace:string = "";
  viewingRate:number = 0;
  viewingMood:number = 0;

  constructor(
      private route:ActivatedRoute,
      public detailMovieSvc:MovieDetailService,
      private wishSvc:WishService,
      private watchSvc:WatchService,
      private _location:Location,
  ) {}

  ngOnInit() {
    this.idMovie = this.route.snapshot.params['id'];
    this.detailMovieSvc.getDetailsFromApi(this.idMovie);
  }

  goBack() {
    this._location.back();
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w300"+urlFragment;
  }
  
  addWish() {
    // this.idCollection = 1313;
    let sendToApi = { 
      // idCollection:this.idCollection,
      idMovie:this.idMovie, 
    };
    
    this.wishSvc.postWishMovieToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {console.log(response.status)},
      error: error => console.error(error)
    });
  }

  checkWatch() {
    this.viewingMood = 1;
    this.viewingPlace = "cinéma";
    this.viewingRate = 5;
    let sendToApi = { 
      idMovie:this.idMovie, 
      viewingPlace:this.viewingPlace, 
      viewingRate:this.viewingRate, 
      viewingMood:this.viewingMood
    };
    console.log(sendToApi);

    this.watchSvc.postWatchMovieToApi(sendToApi)
    .subscribe({
      next: (response:any) => {
        console.log(response)
        if(response.status = "201") {
          
        }
      },
      error: error => console.error(error)
    });

  }

}
