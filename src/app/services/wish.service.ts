import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WishesMovie } from '../librarymovie/models/wishes-movie.model';
import { WishesTv } from '../librarytv/models/wishes-tv.model';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  apiBack = environment.base_url_apiBack;
  apiPostWishMovie:string = '/wish/movie';
  apiPostWishTv:string = '/wish/tv';
  apiGetWishMovies:string = '/wish/movie/all';
  apiGetWishTvs:string = '/wish/episode/all';
  private _wishesMovie$:BehaviorSubject<any> = new BehaviorSubject([]);
  private _wishesTv$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
  ) {}

  getWishMoviesFromApi() {
    
    this.http.get(this.apiBack+this.apiGetWishMovies)
    
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (wish: any) => new WishesMovie(wish) )
      })
    )

    .subscribe((wishes:WishesMovie[]) => {
      let actualWishes = this._wishesMovie$.getValue();
      let allWishes:any = [...actualWishes, ...wishes]
      if (allWishes.length !== 0){
        this._wishesMovie$.next(allWishes);
      }
    });
  }

  getWishesMovie$ ():Observable<WishesMovie[]> {
    return this._wishesMovie$.asObservable();
  }

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

  postWishTvToApi(postWishTv: any) {
    return this.http.post(this.apiBack+this.apiPostWishTv, postWishTv, {observe: 'response', responseType: 'text'});
  }



}