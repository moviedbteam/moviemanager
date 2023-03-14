import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BackDetailMovie } from 'src/app/detailsheetmovie/models/back-detail-movie.model';
import { environment } from 'src/environments/environment';

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
        return apiResponse.map( (watch: any) => new BackDetailMovie(watch) );
      })
    )
    
    .subscribe((watches:BackDetailMovie[]) => {
      let actualWatches = this._watchesMovie$.getValue();
      let allWatches:any = [...actualWatches, ...watches]
      if (allWatches.length !== 0){ 
        this._watchesMovie$.next(allWatches);
      }
    });    
  }
  
  getWatchesMovie$ ():Observable<BackDetailMovie[]> {
    return this._watchesMovie$.asObservable();
  }

}
