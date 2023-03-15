import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WatchesTv } from '../librarytv/models/watches-tv.model';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  apiBack = environment.base_url_apiBack;
  apiPostWatchTv:string = '/watch/tv';
  
  
  
  // apiGetWatchTvs:string = '/watch/episode/all';
  apiGetWatchTvs:string = '/tv/watchlist';
  
  private _watchesTv$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
  ) {}

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
