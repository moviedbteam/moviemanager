import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WatchesMovie } from '../librarymovie/models/watches-movie.model';
import { WatchesTv } from '../librarytv/models/watches-tv.model';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  apiBack = environment.base_url_apiBack;
  apiPostWatchMovie:string = '/watch/movie';
  apiPostWatchTv:string = '/watch/tv';
  apiGetWatchMovies:string = '/watch/movie/all';
  apiGetWatchTvs:string = '/watch/episode/all';
  private _watchesMovie$:BehaviorSubject<any> = new BehaviorSubject([]);
  private _watchesTv$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
  ) {}

  getWatchMoviesFromApi() {
    
    this.http.get(this.apiBack+this.apiGetWatchMovies)

    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (watch: any) => new WatchesMovie(watch) );
      })
    )
    
    .subscribe((watches:WatchesMovie[]) => {
      let actualWatches = this._watchesMovie$.getValue();
      let allWatches:any = [...actualWatches, ...watches]
      if (allWatches.length !== 0){ 
        this._watchesMovie$.next(allWatches);
      }
    });    
  }
  
  getWatchesMovie$ ():Observable<WatchesMovie[]> {
    return this._watchesMovie$.asObservable();
  }
  
  postWatchMovieToApi(postWatchMovie: any) {
    return this.http.post(this.apiBack+this.apiPostWatchMovie, postWatchMovie, {observe: 'response', responseType: 'text'} );
  }

  getWatchTvsFromApi() {
    
    this.http.get(this.apiBack+this.apiGetWatchTvs)

    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (watch: any) => new WatchesTv(watch) );
      })
    )
    
    .subscribe((watches:WatchesTv[]) => {
      let actualWatches = this._watchesTv$.getValue();
      let allWatches:any = [...actualWatches, ...watches]
      if (allWatches.length !== 0){ 
        this._watchesTv$.next(allWatches);
      }
    });    
  }
  
  getWatchesTv$ ():Observable<WatchesTv[]> {
    return this._watchesTv$.asObservable();
  }
  
  postWatchTvToApi(postWatchTv: any) {
    return this.http.post(this.apiBack+this.apiPostWatchTv, postWatchTv, {observe: 'response', responseType: 'text'} );
  }

}
