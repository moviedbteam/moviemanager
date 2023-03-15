import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { DetailMovieService } from '../services/detail-movie.service';
// import { WishService } from '../services/wish.service';
// import { WatchService } from '../services/watch.service';
import { AlertService } from '../services/alert.service';
// import { WishesMovieService } from '../services/wishes-movie.service';
// import { WatchesMovieService } from '../services/watches-movie.service';

@Component({
  selector: 'app-detailsheetmovie',
  templateUrl: './detailsheetmovie.component.html',
  styleUrls: ['./detailsheetmovie.component.css']
})
export class DetailsheetmovieComponent {

  idMovie:number = 0;
  viewingPlace:string = "";
  viewingRate:number = 0;
  viewingMood:number = 0;

  // MAJ Statuts des boutons Wish et Watch
  wishStatusButton: string = "btn btn-outline-warning btn-sm";
  wishTitleButton: string = "Ajouter à la Wish liste";
  watchStatusButton: string = "btn btn-outline-primary btn-sm";
  watchTitleButton: string = "Ajouter à la Watch liste";

  subscriptionDetailMovie:any;

  // *ngIf="movie.idWatch == 0" 
  // "btn btn-primary btn-sm"
  // "Marquer comme vu"
  // "detailMovieSvc.delWatchMovie()"



  constructor(
      private route:ActivatedRoute,
      public detailMovieSvc:DetailMovieService,
      // private wishSvc:WishesMovieService,
      // private watchSvc:WatchesMovieService,
      private _location:Location,
      private alerteSvc:AlertService
  ) {}

  ngOnInit() {
    this.idMovie = this.route.snapshot.params['id'];
    this.detailMovieSvc.getBackDetailsFromApi(this.idMovie);

    this.subscriptionDetailMovie = this.detailMovieSvc.getMovieDetail$()
    .subscribe({
      next: (response:any)=>  {
        console.log(response)
        if (response.idWatch === null && response.idWish === null){
          this.detailMovieSvc.getTmdbDetailsFromApi(this.idMovie);
        }
      },
      error: error => console.error(error)
    });
    

    // MAJ du statut des boutons wish et watch


  }

  updateStatusWishButton() {
    if (this.wishStatusButton.includes('btn-warning')) {
      console.log("Appel à this.detailMovieSvc.delWishMovie()");
      this.detailMovieSvc.delWishMovie();
      this.wishStatusButton = "btn btn-outline-warning btn-sm";
      this.wishTitleButton = "Ajouter à la Wish liste"
    }
    else {
      console.log("Appel à this.addWish()");
      this.addWish();
      this.wishStatusButton = "btn btn-warning btn-sm";
      this.wishTitleButton = "Supprimer de la Wish liste"
    }
  }

  updateStatusWatchButton() {
    if (this.watchStatusButton.includes('btn-primary')) {
      console.log("Appel à this.detailMovieSvc.delWatchMovie()");
      this.detailMovieSvc.delWatchMovie();
      this.watchStatusButton = "btn btn-outline-primary btn-sm";
      this.watchTitleButton = "Ajouter à la Watch liste"
    }
    else {
      console.log("Appel à this.checkWatch()");
      this.checkWatch();
      this.watchStatusButton = "btn btn-primary btn-sm";
      this.watchTitleButton = "Supprimer de la Watch liste"
    }
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
    
    this.detailMovieSvc.postWishMovieToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {
        console.log(response.status)
        this.alerteSvc.showAlert("Ajouté à la Wish liste!")
      },
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

    this.detailMovieSvc.postWatchMovieToApi(sendToApi)
    .subscribe({
      next: (response:any) => {
        console.log(response)
        if(response.status = "201") {
          
        }
      },
      error: error => console.error(error)
    });
  }

  ngOnDestroy() {
    this.subscriptionDetailMovie.unsubscribe();
  }

}