import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WatchesMovie } from '../models/watches-movie.model';

@Injectable({
  providedIn: 'root'
})
export class WatchesMovieService {

  apiBack = environment.base_url_apiBack;
  apiGetWatchMovies:string = '/movie/watchlist';
  private _watchesMovie$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
  ) { }

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

}
