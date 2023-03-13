import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TvService } from 'src/app/services/tv.service';
import { WatchService } from 'src/app/services/watch.service';
import { WishService } from 'src/app/services/wish.service';
import { TvModel } from '../discovertv/models/tv.model';
import {Location} from '@angular/common';
import { DetailTvService } from './services/detail-tv.service';
import { DetailSeasonTmdbModel } from './models/detail-tv-tmdb.model';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-detailsheettv',
  templateUrl: './detailsheettv.component.html',
  styleUrls: ['./detailsheettv.component.css']
})
export class DetailsheettvComponent {
  
  // Utilisé
  idTv:number = 0;
  idWish:number = 0;
  idWatch:number = 0;

  // Pas utilisé
  idEpisode:number = 0;
  idSeason:number = 0;
  viewingPlace:string = "";
  viewingRate:number = 0;
  viewingMood:number = 0;


  subscriptionDetailSeasons:any;
  detailSeasons: Array<DetailSeasonTmdbModel> = [];


  constructor(
      private route:ActivatedRoute,
      private router:Router,
      public detailTvService: DetailTvService,
      private wishSvc:WishService,
      private watchSvc:WatchService,
      private _location:Location,
      private alerteService:AlertService
  ) {}

  ngOnInit() {

    console.log(this.route.snapshot.params);
    this.idTv = this.route.snapshot.params['id'];

    // vérifie si la série n'est pas dans une Wish/Watch List
    
    
    this.detailTvService.getDetailsFromApiTmdb(this.idTv);

    this.subscriptionDetailSeasons = this.detailTvService.seasonDetail$
    .subscribe( (arrDetailSeasons:any) => {
        this.detailSeasons = arrDetailSeasons
        // tri du tableau des saisons par ordre chronologique
        this.detailSeasons.sort(
          (a,b) => ( a.season_number < b.season_number ? -1 : 1)
        )
      }  

    )

  }

  callTest(str:string) {
    this.alerteService.showAlert("Ajouté aux " + str + "!!!");
  }

  goBack() {
    this._location.back();
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w300"+urlFragment;
  }

  getImgSeasonFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w154"+urlFragment;
  }

  getWishIdTv() {

    this.wishSvc.getWishIdTv().subscribe({
      next: (response:any) => {
        
      },
      error: error => console.error(error)
    })
      
  }

  addWish() {

    // this.idEpisode = 1;
    // this.idSeason = 1;
    // this.idUser = 324827;
    // this.idCollection = 1313;
    this.idTv = this.route.snapshot.params['id'];
    let sendToApi = { 
      // idEpisode:this.idEpisode,
      // idSeason:this.idSeason,
      // idUser:this.idUser, 
      // idCollection:this.idCollection ,
      idTv:this.idTv
    };
    console.log(sendToApi);

    this.wishSvc.postWishTvToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {console.log(response.status)},
      error: error => console.error(error)
    });

  }

  checkWatch() {

    // this.idEpisode = 1;
    // this.idSeason = 1;
    // this.idUser = 324827;
    // this.idCollection = 1313;
    this.idTv = this.route.snapshot.params['id'];
    this.viewingPlace = "cinéma";
    this.viewingRate = 5;
    this.viewingMood = 1;
    let sendToApi = { 
      idEpisode:this.idEpisode,
      idSeason:this.idSeason,
      // idUser:this.idUser, 
      // idCollection:this.idCollection, 
      idTv:this.idTv, 
      viewingPlace:this.viewingPlace, 
      viewingRate:this.viewingRate, 
      viewingMood:this.viewingMood
    };
    console.log(sendToApi);

    this.watchSvc.postWatchTvToApi(sendToApi)
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
    this.subscriptionDetailSeasons.unsubscribe();
  }

}
