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

interface wishEpisodeInterface {
  cssIconOn: string;
  cssIconTitleOn: string;
  idWish: number;
}
interface wishSeasonInterface {
  cssIconOn: string;
  cssIconTitleOn: string;
  seasonNumber: number;
}

@Component({
  selector: 'app-detailsheettv',
  templateUrl: './detailsheettv.component.html',
  styleUrls: ['./detailsheettv.component.css']
})
export class DetailsheettvComponent {
  
  // Utilisé
  idSerie:number = 0;
  idWishSerie:number = -1; // ID propre à la série non présent en BDD => vaut 0 si au moins un episode est en Wish
  idWatchSerie:number = -1;

  subscriptionDetailSeasons:any;
  detailSeasons: Array<DetailSeasonTmdbModel> = [];

  mapWishEpisode: Map<number,wishEpisodeInterface> = new Map<number,wishEpisodeInterface>(); // tous les episodes wish
  mapWishSeason: Map<number,wishSeasonInterface> = new Map<number,wishSeasonInterface>(); // toutes les saisons wish
  
  mapWatchEpisode: Map<number,wishEpisodeInterface> = new Map<number,wishEpisodeInterface>(); // tous les episodes watch
  mapWatchSeason: Map<number,wishEpisodeInterface> = new Map<number,wishEpisodeInterface>(); // tous les saisons watch

  
  // Statuts des gros boutons généraux Wish et Watch
  wishStatusButton: string = "btn btn-outline-warning btn-sm";
  wishTitleButton: string = "Ajouter tous les épisodes à la Wish liste";

  watchStatusButton: string = "btn btn-primary btn-sm";
  watchTitleButton: string = "Ajouter tous les épisodes à la Watch liste";

  // Statut des icônes Wish de la saison
  _wishStatusIconOn: string = "fa-solid fa-bookmark fa-lg"
  _wishStatusIconOff: string = "fa-regular fa-bookmark fa-lg"
  _wishTitleIconOn: string = "Supprimer de la Wish liste"
  _wishTitleIconOff: string = "Ajouter à la Wish liste"

    // Statut des icônes Watch de la saison
    _watchStatusIconOn: string = "fa-sharp fa-solid fa-circle-check fa-lg"
    _watchStatusIconOff: string = "fa-regular fa-bookmark fa-lg"
    _watchTitleIconOn: string = "Restaurer en Non Vu"
    _watchTitleIconOff: string = "Ajouter comme Vu"



  
  
  // Pas utilisé
  idEpisode:number = 0;
  idSeason:number = 0;
  viewingPlace:string = "";
  viewingRate:number = 0;
  viewingMood:number = 0;



  constructor(
      private route:ActivatedRoute,
      private router:Router,
      public detailTvService: DetailTvService,
      private wishSvc:WishService,
      private watchSvc:WatchService,
      private _location:Location,
      private alerteService:AlertService
  ) {}

  async ngOnInit() {

    console.log(this.route.snapshot.params);
    this.idSerie = this.route.snapshot.params['id'];

    // vérifie si la série n'est pas dans une Wish/Watch List
    await this.checkWishWatchSerie();

    console.log("======== Après checkWishWatch ===========")
    console.log("this.idWishSerie = " + this.idWishSerie)
    console.log("this.idWatchSerie = " + this.idWatchSerie)
    
    // récupère tous les wish de la série
    this.buildMapIconesEpisodesSaisons();
    

    // GET infos Série (TMDB)
    this.detailTvService.getDetailsFromApiTmdb(this.idSerie);

    // GET infos Saisons (TMDB)
    this.subscriptionDetailSeasons = this.detailTvService.seasonDetail$
    .subscribe( (arrDetailSeasons:any) => {
        this.detailSeasons = arrDetailSeasons
        // tri du tableau des saisons par ordre chronologique
        this.detailSeasons.sort(
          (a,b) => ( a.season_number < b.season_number ? -1 : 1)
        )

        console.log("detailSeasons :", this.detailSeasons);
      }  

    )

  }


  // BUILD map Wish Episode <-> Btn css active

  buildMapIconesEpisodesSaisons() {
    // API pour récupérer tous les episodes Wish
    // https://redline.fr.nf/api/v1/wish/episode/all
    this.wishSvc.getAllWishId().subscribe({
      next: (response:any) => {
        console.log("buildMapBtnEpisodes > getAllWishId ", response)
        for (let wish of response) {
          // on ne prend que les wish de la série
          if(wish.idTv == this.idSerie) {
            this.mapWishEpisode.set(wish.idEpisode, {
              cssIconOn: this._wishStatusIconOn,
              cssIconTitleOn: this._wishTitleIconOn,
              idWish: wish.idWish
            })
            // MAJ de la map des saisons
            this.mapWishSeason.set(wish.idSeason, {
              cssIconOn: this._wishStatusIconOn,
              cssIconTitleOn: this._wishTitleIconOn,
              seasonNumber: wish.seasonNumber
            })
          }
        }
        console.log("this.mapWishEpisode = ", this.mapWishEpisode)
      },
      error: error => console.error(error)
    })
    
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

  async checkWishWatchSerie() {

    // vérifie si la série a un WishId
    await this.wishSvc.getWishIdTv().toPromise().then((response:any) => {
      console.log("getWishIdTv ", response)
      for (let wish of response) {
        if(wish.idTv == this.idSerie) {
          this.idWishSerie = wish.idWish;
          break;
        }
      }
      console.log("this.idWishSerie = " + this.idWishSerie)
      this.initStatusWishButton();
    }).catch((error: any) => {
      console.error(error);
    });

  // vérifie si la série a un WatchId
  await this.wishSvc.getWatchIdTv().toPromise().then((response:any) => {
      console.log("getWatchIdTv ", response)
      for (let watch of response) {
        if(watch.idTv == this.idSerie) {
          this.idWatchSerie = watch.idWatch;
          break;
        }
      }
      console.log("this.idWatchSerie = " + this.idWatchSerie)
      // this.initStatusWishButton();
    }).catch((error: any) => {
      console.error(error);
    });

  }


  /////////////////////
  // ALL WISH EPISODES
  /////////////////////
  addAllWishEpisodes() {

    this.idSerie = this.route.snapshot.params['id'];

    this.wishSvc.postAllWishEpisodesToApi(this.idSerie)
    .subscribe({
      next: (response:any)=> {
        console.log("addAllWishEpisodes > wishSvc.postAllWishEpisodesToApi", response)
        for (let wish of response) {
          // MAJ de la map des episodes
          this.mapWishEpisode.set(wish.idEpisode, {
            cssIconOn: this._wishStatusIconOn,
            cssIconTitleOn: this._wishTitleIconOn,
            idWish: wish.idWish
          })
          
          // MAJ de la map des saisons
          this.mapWishSeason.set(wish.idSeason, {
            cssIconOn: this._wishStatusIconOn,
            cssIconTitleOn: this._wishTitleIconOn,
            seasonNumber: wish.seasonNumber
          })
        }

      },
      error: error => console.error(error)
    });

  }

  deleteAllWishEpisodes() {

    this.idSerie = this.route.snapshot.params['id'];

    this.wishSvc.deleteAllWishEpisodesToApi(this.idSerie)
    .subscribe({
      next: (response:any)=> {
        console.log("delAllWishEpisodes > wishSvc.delAllWishEpisodesToApi", response)

          // MAJ de la map des episodes
          this.mapWishEpisode.clear();
          // MAJ de la map des saisons
          this.mapWishSeason.clear();
        
      },
      error: error => console.error(error)
    });

  }

  //////////////////////////////////
  // ALL WISH EPISODES OF A SEASON
  //////////////////////////////////

  addAllWishEpisodesOfSeason(idSeason: number) {

    console.log("Début addAllWishEpisodesOfSeason")
    this.wishSvc.postAllWishEpisodesOfSeasonToApi(this.idSerie, idSeason)
    .subscribe({
      next: (response:any)=> {
        console.log("addAllWishEpisodesOfSeason > wishSvc.postAllWishEpisodesOfSeasonToApi", response)
        
        for (let wish of response) {
            // MAJ de la map des episodes
            this.mapWishEpisode.set(wish.idEpisode, {
              cssIconOn: this._wishStatusIconOn,
              cssIconTitleOn: this._wishTitleIconOn,
              idWish: wish.idWish
            })

            // MAJ de la map des saisons
            this.mapWishSeason.set(wish.idSeason, {
              cssIconOn: this._wishStatusIconOn,
              cssIconTitleOn: this._wishTitleIconOn,
              seasonNumber: wish.seasonNumber
            })

            // MAJ le gros bouton Wish
            console.log("this.mapWishEpisode.size " +  this.mapWishEpisode.size)
            if (this.mapWishEpisode.size > 0) {
              this.setStatusWishButton(1);
            }
            else {
              this.setStatusWishButton(0);
            }
        }
      },
      error: error => console.error(error)
    });

  }

  delAllWishEpisodesOfSeason(idSeason: number) {

    console.log("Début delAllWishEpisodesOfSeason")
    this.wishSvc.deleteAllWishEpisodesOfSeasonToApi(this.idSerie, idSeason)
    .subscribe({
      next: (response:any)=> {
        console.log("delAllWishEpisodesOfSeason > wishSvc.deleteAllWishEpisodesOfSeasonToApi", response)
        
        for (let wish of response) {
          // MAJ de la map des episodes
          if (this.mapWishEpisode.has(wish.idEpisode)) { 
            this.mapWishEpisode.delete(wish.idEpisode)
          }

          // MAJ de la map des saisons
          if (this.mapWishSeason.has(wish.idSeason)) {
            this.mapWishSeason.delete(wish.idSeason)
          }

          // MAJ le gros bouton Wish
          console.log("this.mapWishEpisode.size " +  this.mapWishEpisode.size)
          if (this.mapWishEpisode.size > 0) {
            this.setStatusWishButton(1);
          }
          else {
            this.setStatusWishButton(0);
          }
        }
      },
      error: error => console.error(error)
    });

  }

  ////////////////
  // WISH EPISODE
  ////////////////

  addWishEpisode(idSeason: number, idEpisode: number) {

    this.wishSvc.postWishEpisodeToApi(this.idSerie, idSeason, idEpisode)
    .subscribe({
      next: (wish:any)=> {
        console.log("addWishEpisode > wishSvc.postWishEpisodeToApi", wish)
          // MAJ de la map des episodes
          this.mapWishEpisode.set(wish.idEpisode, {
            cssIconOn: this._wishStatusIconOn,
            cssIconTitleOn: this._wishTitleIconOn,
            idWish: wish.idWish
          })
          
          // MAJ de la map des saisons
          this.mapWishSeason.set(wish.idSeason, {
            cssIconOn: this._wishStatusIconOn,
            cssIconTitleOn: this._wishTitleIconOn,
            seasonNumber: wish.seasonNumber
          })

          // MAJ le gros bouton Wish
          console.log("this.mapWishEpisode.size " +  this.mapWishEpisode.size)
          if (this.mapWishEpisode.size > 0) {
            this.setStatusWishButton(1);
          }
          else {
            this.setStatusWishButton(0);
          }          
        

      },
      error: error => console.error(error)
    });

  }


  initStatusWishButton() {
    if (this.idWishSerie == 0) {
      // console.log("IF idWish == 0")
      this.setStatusWishButton(1);
    } else {
      // console.log("IF idWish != 0")
      this.setStatusWishButton(0);
    }
  }

  setStatusWishButton(status: number) {
    if (status) {
      this.wishTitleButton = "Supprimer tous les épisodes la Wish liste";
      this.wishStatusButton = "btn btn-warning btn-sm";
    }
    else {
      this.wishTitleButton = "Ajouter tous les épisodes à la Wish liste";
      this.wishStatusButton = "btn btn-outline-warning btn-sm";
    }
  }

  updateStatusWishButton() {
    if (this.wishStatusButton.includes('btn-warning')) {
      console.log("Appel à this.delAllWishEpisodes()");
      this.deleteAllWishEpisodes();
      this.setStatusWishButton(0);
    }
    else {
      console.log("Appel à this.addAllWishEpisodes()");
      this.addAllWishEpisodes();
      this.setStatusWishButton(1);
    }
  }

  updateStatusWishSeason(idSeason: number) {

    // Recherche du statut de l'icône dans la map saison
    // => S'il n'est pas présent dans la map c'est que l'icône est à off
    if ( this.mapWishSeason.has(idSeason) ) {
      console.log("Appel à this.delAllWishEpisodesOfSeason()");
      this.delAllWishEpisodesOfSeason(idSeason)
    }
    else {
      console.log("Appel à this.addAllWishEpisodesOfSeason()");
      this.addAllWishEpisodesOfSeason(idSeason)
    }
  }

  updateStatusWishEpisode(idSeason: number, idEpisode: number) {

    // Recherche du statut de l'icône dans la map episode
    // => S'il n'est pas présent dans la map c'est que l'icône est à off
    if ( this.mapWishEpisode.has(idEpisode) ) {
      console.log("Appel à this.updateStatusWishEpisode() > this.mapWishEpisode.has(idEpisode) VRAI");
      // this.delAllWishEpisodesOfSeason(idSeason)
    }
    else {
      console.log("Appel à this.updateStatusWishEpisode() > this.mapWishEpisode.has(idEpisode) FAUX");
      this.addWishEpisode(idSeason, idEpisode)
    }
  }

  ngOnDestroy() {
    this.subscriptionDetailSeasons.unsubscribe();
  }

}
