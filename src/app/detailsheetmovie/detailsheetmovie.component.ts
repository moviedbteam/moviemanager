import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { MovieService } from '../services/movie.service';
import { AlertService } from '../services/alert.service';

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

  // Statuts des boutons Wish et Watch
  wishStatusButton: string = "btn btn-outline-warning btn-sm";
  wishTitleButton: string = "Ajouter à la Wish liste";
  watchStatusButton: string = "btn btn-outline-primary btn-sm";
  watchTitleButton: string = "Ajouter à la Watch liste";

  subscription:any;

  constructor(
      private route:ActivatedRoute,
      public movieSvc:MovieService,
      private _location:Location,
      private alerteSvc:AlertService
  ) {}

  ngOnInit() {
    this.idMovie = this.route.snapshot.params['id'];
    console.log(this.idMovie);

    this.movieSvc.getBackDetailsFromApi(this.idMovie);
    
    this.subscription = this.movieSvc.getMovieDetail$()
    .subscribe({
      next: (response:any)=>  {
        if ( response.idMovie === null) this.movieSvc.getTmdbDetailsFromApi(this.idMovie);
        // INIT statut des boutons wish et watch
        if (response.idWish > 0) this.setStatusWishButton(1) ;
        if (response.idWatch > 0) this.setStatusWatchButton(1) ;
        return;
      },
      error: error => console.error(error)
    });
  }

  updateStatusWishButton() {
    if (this.wishStatusButton.includes('btn-warning')) {
      console.log("Appel à this.movieSvc.delWishMovie()");
      this.movieSvc.delWishMovie();
      this.setStatusWishButton(0)
    }
    else {
      console.log("Appel à this.addWish()");
      this.addWish();
      this.setStatusWishButton(1)
    }
  }

  updateStatusWatchButton() {
    if (this.watchStatusButton.includes('btn-primary')) {
      console.log("Appel à this.movieSvc.delWatchMovie()");
      this.movieSvc.delWatchMovie();
      this.setStatusWatchButton(0)
    }
    else {
      console.log("Appel à this.checkWatch()");
      this.checkWatch();
      this.setStatusWatchButton(1)
    }
  }

  setStatusWishButton(status: number) {
    if (status) {
      this.wishStatusButton = "btn btn-warning btn-sm";
      this.wishTitleButton = "Supprimer de la Wish liste";
    }
    else {
      this.wishStatusButton = "btn btn-outline-warning btn-sm";
      this.wishTitleButton = "Ajouter à la Wish liste";
    }
  }

  setStatusWatchButton(status: number) {
    if (status) {
      this.watchStatusButton = "btn btn-primary btn-sm";
      this.watchTitleButton = "Supprimer de la Watch liste";
    }
    else {
      this.watchStatusButton = "btn btn-outline-primary btn-sm";
      this.watchTitleButton = "Ajouter à la Watch liste";
    }
  }

  goBack() {
    this._location.back();
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w300"+urlFragment;
  }
  
  addWish() {
    let sendToApi = { 
      idMovie:this.idMovie, 
    };
    
    this.movieSvc.postWishMovieToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {
        console.log(response.status)
        this.alerteSvc.showAlert("Ajouté à la Wish liste!")
      },
      error: error => console.error(error)
    });
  }

  checkWatch() {
    let sendToApi = { 
      idMovie:this.idMovie
    };
    console.log(sendToApi);

    this.movieSvc.postWatchMovieToApi(sendToApi)
    .subscribe({
      next: (response:any) => {
        console.log(response.status)
        if(response.status = "201") {
          
        }
      },
      error: error => console.error(error)
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}