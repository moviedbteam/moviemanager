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
import { DetailSeasonMmaModel } from './models/detail-tv-mma.model';
import { UserService } from '../services/user.service';
import { BehaviorSubject } from 'rxjs';

interface wishEpisodeInterface {
  cssIconOn: string;
  cssIconTitleOn: string;
  idWish: number;
  seasonId: number;
}
interface wishSeasonInterface {
  cssIconOn: string;
  cssIconTitleOn: string;
  seasonNumber: number;
}

interface watchEpisodeInterface {
  cssIconOn: string;
  cssIconTitleOn: string;
  idWatch: number;
  seasonId: number;
}
interface watchSeasonInterface {
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
  origineAPI:string = "";
  isAuth = this.userService.isAuth();
  
  loading$ = new BehaviorSubject<boolean>(true);
  loadingAllWishEpisodes$ = new BehaviorSubject<boolean>(true);
  loadingAllWatchEpisodes$ = new BehaviorSubject<boolean>(true);

  subscriptionDetailSeasons:any;
  detailSeasons: Array<DetailSeasonMmaModel> = [];

  mapWishEpisode: Map<number,wishEpisodeInterface> = new Map<number,wishEpisodeInterface>(); // tous les episodes wish
  mapWishSeason: Map<number,wishSeasonInterface> = new Map<number,wishSeasonInterface>(); // toutes les saisons wish
  
  mapWatchEpisode: Map<number,watchEpisodeInterface> = new Map<number,watchEpisodeInterface>(); // tous les episodes watch
  mapWatchSeason: Map<number,watchSeasonInterface> = new Map<number,watchSeasonInterface>(); // tous les saisons watch

  
  // Statuts des gros boutons généraux Wish et Watch
  wishStatusButton: string = "btn btn-outline-warning btn-sm";
  wishTitleButton: string = "Ajouter tous les épisodes de la série à la Wish liste";

  watchStatusButton: string = "btn btn-primary btn-sm";
  watchTitleButton: string = "Marquer tous les épisodes de la série comme 'Vus'";

  // Statut des icônes Wish de la saison
  _wishStatusIconSeasonOn: string = "fa-solid fa-bookmark fa-lg"
  _wishStatusIconSeasonOff: string = "fa-regular fa-bookmark fa-lg"
  _wishTitleIconSeasonOn: string = "Supprimer tous les épisodes de cette saison de la Wish liste"
  _wishTitleIconSeasonOff: string = "Ajouter tous les épisodes de cette saison à la Wish liste"

  // Statut des icônes Wish d'un épisode'
  _wishStatusIconEpisodeOn: string = "fa-solid fa-bookmark fa-lg"
  _wishStatusIconEpisodeOff: string = "fa-regular fa-bookmark fa-lg"
  _wishTitleIconEpisodeOn: string = "Supprimer cet épisode la Wish liste"
  _wishTitleIconEpisodeOff: string = "Ajouter cet épisode la Wish liste"

  // Statut des icônes Watch de la saison
  _watchStatusIconSeasonOn: string = "fa-solid fa-eye fa-lg"
  _watchStatusIconSeasonOff: string = "fa-regular fa-eye-slash fa-lg"
  _watchTitleIconSeasonOn: string = "Restaurer tous les épisodes de cette saison en 'Non Vu'"
  _watchTitleIconSeasonOff: string = "Marquer tous les épisodes de cette saison comme 'Vus'"

  // Statut des icônes Watch d'un épisode'
  _watchStatusIconEpisodeOn: string = "fa-sharp fa-solid fa-eye fa-lg"
  _watchStatusIconEpisodeOff: string = "fa-regular fa-eye-slash fa-lg"
  _watchTitleIconEpisodeOn: string = "Restaurer l'episode 'Non Vu'"
  _watchTitleIconEpisodeOff: string = "Marquer l'episode' comme 'Vu'"

  
  // Pas utilisé
  // idEpisode:number = 0;
  // idSeason:number = 0;
  // viewingPlace:string = "";
  // viewingRate:number = 0;
  // viewingMood:number = 0;



  constructor(
      private route:ActivatedRoute,
      private router:Router,
      public detailTvService: DetailTvService,
      private wishSvc:WishService,
      private watchSvc:WatchService,
      private _location:Location,
      public alerteService:AlertService,
      public userService: UserService
  ) { 
    console.log("========== this.loading$.next(true)")
    this.loading$.next(true);
    this.loadingAllWishEpisodes$.next(false);
    this.loadingAllWatchEpisodes$.next(false);
  }

  async ngOnInit() {

    console.log(this.route.snapshot.params);
    this.idSerie = this.route.snapshot.params['id'];

    // vérifie si la série n'est pas dans une Wish/Watch List
    if(this.isAuth) await this.checkWishWatchSerie();

    console.log("======== Après checkWishWatch ===========")
    console.log("this.idWishSerie = " + this.idWishSerie)
    console.log("this.idWatchSerie = " + this.idWatchSerie)
    
    // récupère tous les wish de la série
    if(this.isAuth) this.buildMapIconesEpisodesSaisons();

    if((this.idWishSerie == 0) || (this.idWatchSerie == 0)) {
      this.origineAPI = "MMA";
      // Les infos de la  série sont à récupérer dans le back
      console.log("Appel de this.detailTvService.getDetailsFromApiMma")
      this.detailTvService.getDetailsFromApiMma(this.idSerie)

      this.subscriptionDetailSeasons = this.detailTvService.seasonDetail$
      .subscribe( (arrDetailSeasons:any) => {
          this.detailSeasons = arrDetailSeasons
          // tri du tableau des saisons par ordre chronologique
          this.detailSeasons.sort(
            (a,b) => ( a.seasonNumber < b.seasonNumber ? -1 : 1)
          )
          this.loading$.next(false);
          console.log("detailSeasons :", this.detailSeasons);
        }  
  
      )
    }
    else {
      // Les infos de la  série sont à récupérer sur TMDB
      // GET infos Série (TMDB)
      this.origineAPI = "TMDB";

      this.detailTvService.getDetailsFromApiTmdb(this.idSerie);
  
      // GET infos Saisons (TMDB)
      this.subscriptionDetailSeasons = this.detailTvService.seasonDetail$
      .subscribe( (arrDetailSeasons:any) => {
          this.detailSeasons = arrDetailSeasons
          // tri du tableau des saisons par ordre chronologique
          this.detailSeasons.sort(
            (a,b) => ( a.seasonNumber < b.seasonNumber ? -1 : 1)
          )
          console.log("========== this.loading$.next(false)")
          this.loading$.next(false);
          console.log("detailSeasons :", this.detailSeasons);
          console.log("this.loading$ ", this.loading$.getValue())
        }  
  
      )

    }

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
              cssIconOn: this._wishStatusIconEpisodeOn,
              cssIconTitleOn: this._wishTitleIconEpisodeOn,
              idWish: wish.idWish,
              seasonId: wish.idSeason
            })
            // MAJ de la map des saisons
            this.mapWishSeason.set(wish.idSeason, {
              cssIconOn: this._wishStatusIconSeasonOn,
              cssIconTitleOn: this._wishTitleIconSeasonOn,
              seasonNumber: wish.seasonNumber
            })
          }
        }
        console.log("this.mapWishEpisode = ", this.mapWishEpisode)
      },
      error: error => console.error(error)
    })
    
    // API pour récupérer tous les episodes Watch
    // https://redline.fr.nf/api/v1/watch/episode/all
    this.watchSvc.getAllWatchId().subscribe({
      next: (response:any) => {
        console.log("buildMapBtnEpisodes > getAllWatchId ", response)
        for (let watch of response) {
          // on ne prend que les watch de la série
          if(watch.idTv == this.idSerie) {
            this.mapWatchEpisode.set(watch.idEpisode, {
              cssIconOn: this._watchStatusIconEpisodeOn,
              cssIconTitleOn: this._watchTitleIconEpisodeOn,
              idWatch: watch.idWatch,
              seasonId: watch.idSeason
            })
            // MAJ de la map des saisons
            this.mapWatchSeason.set(watch.idSeason, {
              cssIconOn: this._watchStatusIconSeasonOn,
              cssIconTitleOn: this._watchTitleIconSeasonOn,
              seasonNumber: watch.seasonNumber
            })
          }
        }
        console.log("this.mapWishEpisode = ", this.mapWishEpisode)
        console.log("this.mapWatchEpisode = ", this.mapWatchEpisode)
        console.log("this.mapWatchSeason = ", this.mapWatchSeason)
      },
      error: error => console.error(error)
    })
    
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
  await this.watchSvc.getWatchIdTv().toPromise().then((response:any) => {
      console.log("getWatchIdTv ", response)
      for (let watch of response) {
        if(watch.idTv == this.idSerie) {
          this.idWatchSerie = watch.idWatch;
          break;
        }
      }
      console.log("this.idWatchSerie = " + this.idWatchSerie)
      this.initStatusWatchButton();
    }).catch((error: any) => {
      console.error(error);
    });

  }


  /////////////////////
  // ALL WISH EPISODES
  /////////////////////
  addAllWishEpisodes() {

    this.idSerie = this.route.snapshot.params['id'];

    this.loadingAllWishEpisodes$.next(true);

    this.wishSvc.postAllWishEpisodesToApi(this.idSerie)
    .subscribe({
      next: (response:any)=> {
        console.log("addAllWishEpisodes > wishSvc.postAllWishEpisodesToApi", response)
        for (let wish of response) {
          // MAJ de la map des episodes
          this.mapWishEpisode.set(wish.idEpisode, {
            cssIconOn: this._wishStatusIconEpisodeOn,
            cssIconTitleOn: this._wishTitleIconEpisodeOn,
            idWish: wish.idWish,
            seasonId: wish.idSeason
          })
          
          // MAJ de la map des saisons
          this.mapWishSeason.set(wish.idSeason, {
            cssIconOn: this._wishStatusIconSeasonOn,
            cssIconTitleOn: this._wishTitleIconSeasonOn,
            seasonNumber: wish.seasonNumber
          })
          this.loadingAllWishEpisodes$.next(false);
          this.alerteService.showAlert("Tous les épisodes de la série ont été ajoutés à la Wish liste")
        }

      },
      error: error => console.error(error)
    });

  }

  deleteAllWishEpisodes() {

    this.idSerie = this.route.snapshot.params['id'];
    this.loadingAllWishEpisodes$.next(true);

    this.wishSvc.deleteAllWishEpisodesToApi(this.idSerie)
    .subscribe({
      next: (response:any)=> {
        console.log("delAllWishEpisodes > wishSvc.delAllWishEpisodesToApi", response)

          // MAJ de la map des episodes
          this.mapWishEpisode.clear();
          // MAJ de la map des saisons
          this.mapWishSeason.clear();

          this.loadingAllWishEpisodes$.next(false);
          this.alerteService.showAlert("Tous les épisodes de la série ont été supprimés de la Wish liste")
        
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
              cssIconOn: this._wishStatusIconEpisodeOn,
              cssIconTitleOn: this._wishTitleIconEpisodeOn,
              idWish: wish.idWish,
              seasonId: wish.idSeason
            })

            // MAJ de la map des saisons
            this.mapWishSeason.set(wish.idSeason, {
              cssIconOn: this._wishStatusIconSeasonOn,
              cssIconTitleOn: this._wishTitleIconSeasonOn,
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

            this.alerteService.showAlert("Tous les épisodes de cette saison ont été ajoutés à la Wish liste");
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

          this.alerteService.showAlert("Tous les épisodes de cette saison ont été supprimés de la Wish liste");
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
            cssIconOn: this._wishStatusIconEpisodeOn,
            cssIconTitleOn: this._wishTitleIconEpisodeOn,
            idWish: wish.idWish,
            seasonId: wish.idSeason
          })
        console.log("mapWishEpisode ", this.mapWishEpisode)

          
          // MAJ de la map des saisons
          this.mapWishSeason.set(wish.idSeason, {
            cssIconOn: this._wishStatusIconSeasonOn,
            cssIconTitleOn: this._wishTitleIconSeasonOn,
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
        
          this.alerteService.showAlert("L'épisode a été ajouté à la Wish liste");

      },
      error: error => console.error(error)
    });

  }

  delWishEpisode(idSeason: number, idEpisode: number) {

    // Récupération de l'IdWish à supprimer
    let wishIdToDelete:any;
    if (this.mapWishEpisode.has(idEpisode)) {
      wishIdToDelete = this.mapWishEpisode.get(idEpisode)?.idWish 
      console.log("wishIdToDelete = " + wishIdToDelete)
    }

    this.wishSvc.deleteWishEpisodeToApi(wishIdToDelete)
    .subscribe({
      next: (wish:any)=> {
        console.log("addWishEpisode > wishSvc.deleteWishEpisodeToApi", wish)
        console.log("mapWishSeason au début de deleteWishEpisodeToApi", this.mapWishSeason)

        // MAJ de la map des episodes
        this.mapWishEpisode.delete(idEpisode)  
        console.log("idEpisode " + idEpisode + " effacé de mapWishEpisode")
        console.log("mapWishEpisode ", this.mapWishEpisode)
          
          
          // MAJ de la map des saisons: s'il n'y a plus d'épisode de la saison => on supprime la saison de mapWatchSeason          
          // const hasSeason = [...this.mapWishEpisode.values()].some((wishEpisode) => wishEpisode.seasonNumber === idSeason);
          // if (!hasSeason) {
          //   this.mapWishSeason.delete(idSeason)
          //   console.log("idSeason " + idSeason + " effacé de mapWishSeason")
          //   console.log("mapWishSeason ", this.mapWishSeason)
          // }


          let deleteIdSeason = true;
          console.log("mapWishSeason au début de deleteWishEpisodeToApi avant : for(let wishEpisode of this.mapWishEpisode.entries())", this.mapWishSeason)
          console.log("mapWishEpisode au début de deleteWishEpisodeToApi avant : for(let wishEpisode of this.mapWishEpisode.entries())", this.mapWishEpisode)
          for (let wishEpisode of this.mapWishEpisode.entries()) {
            console.log("wishEpisode[1].seasonId = " + wishEpisode[1].seasonId)
            console.log("idSeason = " + idSeason)
            if(wishEpisode[1].seasonId == idSeason) {
              console.log("On est dans le : if(wishEpisode[0] == idSeason)")
              deleteIdSeason = false;
              break;
            }
          }
          console.log("Après le for deleteIdSeason = " + deleteIdSeason)
          console.log("mapWishSeason au début de deleteWishEpisodeToApi après : for(let wishEpisode of this.mapWishEpisode.entries())", this.mapWishSeason)
          console.log("mapWishEpisode au début de deleteWishEpisodeToApi après : for(let wishEpisode of this.mapWishEpisode.entries())", this.mapWishEpisode)
          
          if(deleteIdSeason) {
            this.mapWishSeason.delete(idSeason);
          }

        console.log("mapWishSeason à la fin de deleteWishEpisodeToApi", this.mapWishSeason)
        console.log("mapWishEpisode à la fin de deleteWishEpisodeToApi", this.mapWishEpisode)


          // MAJ le gros bouton Watch
          console.log("this.mapWishEpisode.size " +  this.mapWatchEpisode.size)
          if (this.mapWatchEpisode.size > 0) {
            this.setStatusWishButton(1);
          }
          else {
            this.setStatusWishButton(0);
          }          
        
          this.alerteService.showAlert("L'épisode a été marqué comme 'Vu'");

      },
      error: error => console.error(error)
    });
  }

    /////////////////////
  // ALL WATCH EPISODES
  /////////////////////
  addAllWatchEpisodes() {

    this.loadingAllWatchEpisodes$.next(true);

    this.watchSvc.postAllWatchEpisodesToApi(this.idSerie)
    .subscribe({
      next: (response:any)=> {
        console.log("addAllWatchEpisodes > wishSvc.postAllWatchEpisodesToApi", response)
        for (let watch of response) {
          // MAJ de la map des episodes
          this.mapWatchEpisode.set(watch.idEpisode, {
            cssIconOn: this._watchStatusIconEpisodeOn,
            cssIconTitleOn: this._watchTitleIconEpisodeOn,
            idWatch: watch.idWatch,
            seasonId: watch.idSeason
          })
          
          // MAJ de la map des saisons
          this.mapWatchSeason.set(watch.idSeason, {
            cssIconOn: this._watchStatusIconSeasonOn,
            cssIconTitleOn: this._watchTitleIconSeasonOn,
            seasonNumber: watch.seasonNumber
          })

          this.loadingAllWatchEpisodes$.next(false);
          this.alerteService.showAlert("Tous les épisodes de la série ont été marqués comme 'Vus'")
        }

      },
      error: error => console.error(error)
    });

  }

  deleteAllWatchEpisodes() {

    this.loadingAllWatchEpisodes$.next(true);

    this.watchSvc.deleteAllWatchEpisodesToApi(this.idSerie)
    .subscribe({
      next: (response:any)=> {
        console.log("delAllWatchEpisodes > wishSvc.delAllWatchEpisodesToApi", response)

          // MAJ de la map des episodes
          this.mapWatchEpisode.clear();
          // MAJ de la map des saisons
          this.mapWatchSeason.clear();

          this.loadingAllWatchEpisodes$.next(false);
          this.alerteService.showAlert("Tous les épisodes de la série ont été restaurés en 'Non Vu'")
        
      },
      error: error => console.error(error)
    });

  }

  //////////////////////////////////
  // ALL WATCH EPISODES OF A SEASON
  //////////////////////////////////

  addAllWatchEpisodesOfSeason(idSeason: number) {

    console.log("Début addAllWatchEpisodesOfSeason")
    this.watchSvc.postAllWatchEpisodesOfSeasonToApi(this.idSerie, idSeason)
    .subscribe({
      next: (response:any)=> {
        console.log("addAllWatchEpisodesOfSeason > wishSvc.postAllWatchEpisodesOfSeasonToApi", response)
        
        for (let watch of response) {
            // MAJ de la map des episodes
            this.mapWatchEpisode.set(watch.idEpisode, {
              cssIconOn: this._watchStatusIconEpisodeOn,
              cssIconTitleOn: this._watchTitleIconEpisodeOn,
              idWatch: watch.idWatch,
              seasonId: watch.idSeason
            })

            // MAJ de la map des saisons
            this.mapWatchSeason.set(watch.idSeason, {
              cssIconOn: this._watchStatusIconSeasonOn,
              cssIconTitleOn: this._watchTitleIconSeasonOn,
              seasonNumber: watch.seasonNumber
            })

            // MAJ le gros bouton Watch
            console.log("this.mapWatchEpisode.size " +  this.mapWatchEpisode.size)
            if (this.mapWatchEpisode.size > 0) {
              this.setStatusWatchButton(1);
            }
            else {
              this.setStatusWatchButton(0);
            }

            this.alerteService.showAlert("Tous les épisodes de cette saison ont été marqués comme 'Vus'");
        }
      },
      error: error => console.error(error)
    });

  }

  delAllWatchEpisodesOfSeason(idSeason: number) {

    console.log("Début delAllWatchEpisodesOfSeason")
    this.watchSvc.deleteAllWatchEpisodesOfSeasonToApi(this.idSerie, idSeason)
    .subscribe({
      next: (response:any)=> {
        console.log("delAllWatchEpisodesOfSeason > wishSvc.deleteAllWatchEpisodesOfSeasonToApi", response)
        
        for (let watch of response) {
          // MAJ de la map des episodes
          if (this.mapWatchEpisode.has(watch.idEpisode)) { 
            this.mapWatchEpisode.delete(watch.idEpisode)
          }

          // MAJ de la map des saisons
          if (this.mapWatchSeason.has(watch.idSeason)) {
            this.mapWatchSeason.delete(watch.idSeason)
          }

          // MAJ le gros bouton Watch
          console.log("this.mapWatchEpisode.size " +  this.mapWatchEpisode.size)
          if (this.mapWatchEpisode.size > 0) {
            this.setStatusWatchButton(1);
          }
          else {
            this.setStatusWatchButton(0);
          }

          this.alerteService.showAlert("Tous les épisodes de cette saison ont été restaurés en 'Non Vu'");
        }
      },
      error: error => console.error(error)
    });

  }

    ////////////////
  // WATCH EPISODE
  ////////////////

  addWatchEpisode(idSeason: number, idEpisode: number) {

    this.watchSvc.postWatchEpisodeToApi(this.idSerie, idSeason, idEpisode)
    .subscribe({
      next: (watch:any)=> {
        console.log("addWatchEpisode > wishSvc.postWatchEpisodeToApi", watch)
          // MAJ de la map des episodes
          this.mapWatchEpisode.set(watch.idEpisode, {
            cssIconOn: this._watchStatusIconEpisodeOn,
            cssIconTitleOn: this._watchTitleIconEpisodeOn,
            idWatch: watch.idWatch,
            seasonId: watch.idSeason
          })
          
          // MAJ de la map des saisons
          this.mapWatchSeason.set(watch.idSeason, {
            cssIconOn: this._watchStatusIconSeasonOn,
            cssIconTitleOn: this._watchTitleIconSeasonOn,
            seasonNumber: watch.seasonNumber
          })

          // MAJ le gros bouton Wish
          console.log("this.mapWatchEpisode.size " +  this.mapWatchEpisode.size)
          if (this.mapWatchEpisode.size > 0) {
            this.setStatusWatchButton(1);
          }
          else {
            this.setStatusWatchButton(0);
          }          
        
          this.alerteService.showAlert("L'épisode a été marqué comme 'Vu'");

      },
      error: error => console.error(error)
    });

  }


  delWatchEpisode(idSeason: number, idEpisode: number) {

    // Récupération de l'IdWatch à supprimer
    let watchIdToDelete:any;
    if (this.mapWatchEpisode.has(idEpisode)) {
      watchIdToDelete = this.mapWatchEpisode.get(idEpisode)?.idWatch 
      console.log("watchIdToDelete = " + watchIdToDelete)
    }

    this.watchSvc.deleteWatchEpisodeToApi(watchIdToDelete)
    .subscribe({
      next: (watch:any)=> {
        console.log("addWatchEpisode > wishSvc.postWatchEpisodeToApi", watch)

        // MAJ de la map des episodes
        this.mapWatchEpisode.delete(idEpisode)  
        console.log("idEpisode " + idEpisode + " effacé de mapWishEpisode")
        console.log("mapWishEpisode ", this.mapWishEpisode)
          
          
          // MAJ de la map des saisons: s'il n'y a plus d'épisode de la saison => on supprime la saison de mapWatchSeason          
          const hasSeason = [...this.mapWatchEpisode.values()].some((watchEpisode) => watchEpisode.seasonId === idSeason);
          if (!hasSeason) {
            this.mapWatchSeason.delete(idSeason)
            console.log("idSeason " + idSeason + " effacé de mapWatchSeason")
            console.log("mapWatchSeason ", this.mapWatchSeason)

          }
          

          // MAJ le gros bouton Watch
          console.log("this.mapWatchEpisode.size " +  this.mapWatchEpisode.size)
          if (this.mapWatchEpisode.size > 0) {
            this.setStatusWatchButton(1);
          }
          else {
            this.setStatusWatchButton(0);
          }          
        
          this.alerteService.showAlert("L'épisode a été marqué comme 'Vu'");

      },
      error: error => console.error(error)
    });

  }

  ///////////////////////////
  // INIT STATUS ICON/BUTTON
  //////////////////////////

  initStatusWishButton() {
    if (this.idWishSerie == 0) {
      this.setStatusWishButton(1);
    } else {
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

  initStatusWatchButton() {
    if (this.idWatchSerie == 0) {
      this.setStatusWatchButton(1);
    } else {
      this.setStatusWatchButton(0);
    }
  }

  setStatusWatchButton(status: number) {
    if (status) {
      this.watchTitleButton = "Restaurer tous les épisodes de la série en 'Non Vu'";
      this.watchStatusButton = "btn btn-primary btn-sm";
    }
    else {
      this.watchTitleButton = "Marquer tous les épisodes de la série en 'Vu'";
      this.watchStatusButton = "btn btn-outline-primary btn-sm";
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

  updateStatusWatchButton() {
    if (this.watchStatusButton.includes('btn-primary')) {
      console.log("Appel à this.delAllWatchEpisodes()");
      this.deleteAllWatchEpisodes();
      this.setStatusWatchButton(0);
    }
    else {
      console.log("Appel à this.addAllWatchEpisodes()");
      this.addAllWatchEpisodes();
      this.setStatusWatchButton(1);
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

  updateStatusWatchSeason(idSeason: number) {

    // Recherche du statut de l'icône dans la map saison
    // => S'il n'est pas présent dans la map c'est que l'icône est à off
    if ( this.mapWatchSeason.has(idSeason) ) {
      console.log("Appel à this.delAllWishEpisodesOfSeason()");
      this.delAllWatchEpisodesOfSeason(idSeason)
    }
    else {
      console.log("Appel à this.addAllWishEpisodesOfSeason()");
      this.addAllWatchEpisodesOfSeason(idSeason)
    }
  }

  updateStatusWishEpisode(idSeason: number, idEpisode: number) {

    // Recherche du statut de l'icône dans la map episode
    // => S'il n'est pas présent dans la map c'est que l'icône est à off
    if ( this.mapWishEpisode.has(idEpisode) ) {
      console.log("Appel à this.updateStatusWishEpisode() > this.mapWishEpisode.has(idEpisode) VRAI");
      this.delWishEpisode(idSeason, idEpisode)
    }
    else {
      console.log("Appel à this.updateStatusWishEpisode() > this.mapWishEpisode.has(idEpisode) FAUX");
      this.addWishEpisode(idSeason, idEpisode)
    }
  }

  updateStatusWatchEpisode(idSeason: number, idEpisode: number) {

    // Recherche du statut de l'icône dans la map episode
    // => S'il n'est pas présent dans la map c'est que l'icône est à off
    if ( this.mapWatchEpisode.has(idEpisode) ) {
      console.log("Appel à this.updateStatusWatchEpisode() > this.mapWatchEpisode.has(idEpisode) VRAI");
      this.delWatchEpisode(idSeason, idEpisode)
    }
    else {
      console.log("Appel à this.updateStatusWishEpisode() > this.mapWishEpisode.has(idEpisode) FAUX");
      this.addWatchEpisode(idSeason, idEpisode)
    }
  }

  ngOnDestroy() {
    this.subscriptionDetailSeasons.unsubscribe();
  }

}
