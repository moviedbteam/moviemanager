import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { WishesMovie } from '../librarymovie/models/wishes-movie.model';
import { WishesTv } from '../librarytv/models/wishes-tv.model';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  apiBack = environment.base_url_apiBack;
  apiPostWishMovie:string = '/wish/movie';
  apiPostWishTv:string = '/wish/tv';
  apiPostWishEpisode:string = '/wish/episode';
  apiPostWishEpisodeOfSeason: string = "/wish/season";
  apiDeleteWishEpisodeOfSeason: string = "/wish/season";
  apiDeleteWishEpisode: string = "/wish/episode"

  apiDelWishTv:string = '/wish/tv';

  apiGetWishTvs:string = '/wish/episode/all';

  private _wishesTv$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
  ) {}

  postWishMovieToApi(postWishMovie: any) {
    return this.http.post(this.apiBack+this.apiPostWishMovie, postWishMovie, {observe: 'response', responseType: 'text'});
  }

  getWishTvsFromApi() {
    
    this.http.get(this.apiBack+this.apiGetWishTvs)
    
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
    return this.http.post(this.apiBack+this.apiPostWishTv, data);
  }

  deleteAllWishEpisodesToApi(idTv:number) {
    let data = {idTv:idTv}
    return this.http.delete(this.apiBack+this.apiDelWishTv, {body: data});
  }

  postAllWishEpisodesOfSeasonToApi(idTv: number, idSeason: number) {
    let data = {idTv: idTv, idSeason: idSeason}
    return this.http.post(this.apiBack+this.apiPostWishEpisodeOfSeason, data);
  }

  deleteAllWishEpisodesOfSeasonToApi(idTv: number, idSeason: number) {
    let data = {idTv: idTv, idSeason: idSeason}
    return this.http.delete(this.apiBack+this.apiDeleteWishEpisodeOfSeason, {body: data});
  }

  postWishEpisodeToApi(idTv:number, idSeason: number, idEpisode: number) {
    let data = {idTv:idTv, idSeason:idSeason, idEpisode:idEpisode}
    return this.http.post(this.apiBack+this.apiPostWishEpisode, data);
  }

  deleteWishEpisodeToApi(idTv:number, idSeason: number, idEpisode: number) {
    let data = {idTv:idTv, idSeason:idSeason, idEpisode:idEpisode}
    return this.http.delete(this.apiBack+this.apiDeleteWishEpisode, {body: data} );
  }



  getWishIdTv(){ 
    // renvoie la liste des séries qui ont un WishId
    return this.http.get(this.apiBack + "/tv/wishlist");    
  }

  getWatchIdTv(){ 
    // renvoie la liste des séries qui ont un WatchId
    return this.http.get(this.apiBack + "/tv/watchlist");    
  }

  getAllWishId(){
    return this.http.get(this.apiBack + "/wish/episode/all"); 
  }



}