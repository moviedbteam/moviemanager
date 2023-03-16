import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WishesTv } from '../librarytv/models/wishes-tv.model';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  _apiBack = environment.base_url_apiBack;
  
  // _apiGetWishTvs:string = '/wish/episode/all';
  _apiGetAllWishTv:string = "/wish/episode/all";
  _apiGetAllWatchTv:string = "/watch/episode/all";
  _apiGetListWishTv:string = "/tv/wishlist";
  _apiGetListWatchTv:string = "/tv/watchlist"; 
  
  _apiPostWishMovie:string = '/wish/movie';
  _apiPostWishTv:string = '/wish/tv';
  _apiPostWatchTv:string = '/watch/tv';
  _apiPostWatchEpisodeOfSeason:string = "/watch/season"
  _apiPostWishEpisode:string = '/wish/episode';
  _apiPostWishEpisodeOfSeason: string = "/wish/season";
  _apiPostWatchEpisode: string = "/watch/episode"

  _apiDeleteWishEpisodeOfSeason: string = "/wish/season";
  _apiDeleteWishEpisode: string = "/wish/episode"
  _apiDelWishTv:string = '/wish/tv';
  _apiDelWatchTv:string = '/watch/tv';
  _apiDeleteWatchEpisodeOfSeason:string = "/watch/season";
  _apiDeleteWatchEpisode:string = "/watch/episode"

  private _wishesTv$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
  ) {}

  postWishMovieToApi(postWishMovie: any) {
    return this.http.post(this._apiBack+this._apiPostWishMovie, postWishMovie, {observe: 'response', responseType: 'text'});
  }

  getWishTvsFromApi() {
    
    this.http.get(this._apiBack+this._apiGetListWishTv)
    
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (wish: any) => new WishesTv(wish) )
      })
    )

    .subscribe((wishes:WishesTv[]) => {
      let actualWishes = this._wishesTv$.getValue();
      let allWishes:any = [...actualWishes, ...wishes]
      if (allWishes.length !== 0){
        this._wishesTv$.next(allWishes);
      }
    });
  }

  getWishesTv$ ():Observable<WishesTv[]> {
    return this._wishesTv$.asObservable();
  }

  postAllWishEpisodesToApi(idTv:number) {
    let data = {idTv:idTv}
    return this.http.post(this._apiBack+this._apiPostWishTv, data);
  }

  deleteAllWishEpisodesToApi(idTv:number) {
    let data = {idTv:idTv}
    return this.http.delete(this._apiBack+this._apiDelWishTv, {body: data});
  }

  postAllWishEpisodesOfSeasonToApi(idTv: number, idSeason: number) {
    let data = {idTv: idTv, idSeason: idSeason}
    return this.http.post(this._apiBack+this._apiPostWishEpisodeOfSeason, data);
  }

  deleteAllWishEpisodesOfSeasonToApi(idTv: number, idSeason: number) {
    let data = {idTv: idTv, idSeason: idSeason}
    return this.http.delete(this._apiBack+this._apiDeleteWishEpisodeOfSeason, {body: data});
  }

  postWishEpisodeToApi(idTv:number, idSeason: number, idEpisode: number) {
    let data = {idTv:idTv, idSeason:idSeason, idEpisode:idEpisode}
    return this.http.post(this._apiBack+this._apiPostWishEpisode, data);
  }

  deleteWishEpisodeToApi(wishIdToDelete:number) {
    let data = {wishIdToDelete}
    return this.http.delete(this._apiBack+this._apiDeleteWishEpisode, {body: data} );
  }


  getWishIdTv(){ 
    // renvoie la liste des séries qui ont un WishId
    return this.http.get(this._apiBack + this._apiGetListWishTv);    
  }

  getAllWishId(){
    return this.http.get(this._apiBack + this._apiGetAllWishTv); 
  }
  


  postAllWatchEpisodesToApi(idTv:number) {
    let data = {idTv:idTv}
    return this.http.post(this._apiBack+this._apiPostWatchTv, data);
  }

  deleteAllWatchEpisodesToApi(idTv:number) {
    let data = {idTv:idTv}
    return this.http.delete(this._apiBack+this._apiDelWatchTv, {body: data});
  }

  postAllWatchEpisodesOfSeasonToApi(idTv: number, idSeason: number) {
    let data = {idTv: idTv, idSeason: idSeason}
    return this.http.post(this._apiBack+this._apiPostWatchEpisodeOfSeason, data);
  }

  deleteAllWatchEpisodesOfSeasonToApi(idTv: number, idSeason: number) {
    let data = {idTv: idTv, idSeason: idSeason}
    return this.http.delete(this._apiBack+this._apiDeleteWatchEpisodeOfSeason, {body: data});
  }

  postWatchEpisodeToApi(idTv:number, idSeason: number, idEpisode: number) {
    let data = {idTv:idTv, idSeason:idSeason, idEpisode:idEpisode}
    return this.http.post(this._apiBack+this._apiPostWatchEpisode, data);
  }

  deleteWatchEpisodeToApi(watchIdToDelete:number) {
    let data = {watchIdToDelete}
    return this.http.delete(this._apiBack+this._apiDeleteWatchEpisode, {body: data} );
  }

  getWatchIdTv(){ 
    // renvoie la liste des séries qui ont un WatchId
    return this.http.get(this._apiBack + this._apiGetListWatchTv);    
  }

  getAllWatchId(){
    return this.http.get(this._apiBack + this._apiGetAllWatchTv); 
  }



}