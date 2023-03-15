import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ɵisObservable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, Subject, of} from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DetailSeasonTmdbModel, DetailTvTmdbModel } from '../models/detail-tv-tmdb.model';

@Injectable({
  providedIn: 'root'
})
export class DetailTvService {


  // API TMDB
  apiKeyTmdb = environment.apiKey_apiTmdb;
  apiSerieTmdb = environment.base_url_apiTmdb+'/tv/';
  
  // APIs MMA
  apiBack = environment.base_url_apiBack;

  // apiGetWishMovies:string = '/wish/tv/all';
  // apiGetWatchMovies:string = '/watch/tv/all';

  // apiPostWishMovie:string = '/tv/movie';
  // apiPostWatchMovie:string = '/tv/movie';

  // Observables
  private _serieDetail$ = new BehaviorSubject<DetailTvTmdbModel | any>({});
  private _seasonDetail$: BehaviorSubject<any> = new BehaviorSubject([]);


  constructor(private http:HttpClient) {}

  // METHODES

  getDetailsFromApiTmdb(idTv:number):void {
  // Infos générales de la série

    this._seasonDetail$.next([]);

    let params = new HttpParams()
    .set('api_key', this.apiKeyTmdb)
    .set('language', 'fr-FR')

    this.http.get(this.apiSerieTmdb + idTv, {params})
    .pipe(
      map((apiTmdbResponse:any)=> new DetailTvTmdbModel(apiTmdbResponse))
    )
    .subscribe( (serie:DetailTvTmdbModel) => {
      console.log("serie récupéré de TMDB : ");
      console.log(serie);
      
      for (let i = 0; i <= serie.nbSeasons; i++ ) {
        console.log("saison récupérée de TMDB : ");
        this.getSeasonDetailsFromApiTmdb(idTv, i)
      }
      this._serieDetail$.next(serie);
      
    });

  }

  getSeasonDetailsFromApiTmdb(idTv:number, seasonNum:number):void {
  // Infos sur la saison et ses épisodes

      let params = new HttpParams()
      .set('api_key', this.apiKeyTmdb)
      .set('language', 'fr-FR')

      // console.log("getSeasonDetailsFromApiTmdb > http.get() ");
      this.http.get(this.apiSerieTmdb + idTv + "/season/" + seasonNum, {params})
      .pipe(
        map((seasons:any) => {
          if (!Array.isArray(seasons)) {
            seasons = [seasons];
          }
          return seasons.map( (season: any) => new DetailSeasonTmdbModel(season)) })
      )
      .subscribe( (seasons:DetailSeasonTmdbModel[]) => {
        console.log("getSeasonDetailsFromApiTmdb > subscribe > season: ", seasons);
        let actualSeasons = this._seasonDetail$.getValue();
        let allSeasons:any = [...actualSeasons, ...seasons];
        this._seasonDetail$.next(allSeasons);
        
      });
  }

  get serieDetail$():Observable<DetailTvTmdbModel> {
    return this._serieDetail$.asObservable();
  }

  get seasonDetail$():Observable<DetailSeasonTmdbModel[]> {
    return this._seasonDetail$.asObservable();
  }
}
