import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecoMovie } from '../models/reco-movie.model';

@Injectable({
  providedIn: 'root'
})
export class RecoMovieService {

  apiBack = environment.base_url_apiBack;
  apiGetRecoMovies:string = '/recommendation/movie';
  private _recoMovie$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) { }

  getRecoMovieFromApi(){

    this.http.get(this.apiBack+this.apiGetRecoMovies)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (reco: any) => new RecoMovie(reco) );
      })
    )
    .subscribe((recos:RecoMovie[]) => {

      let actualRecos = this._recoMovie$.getValue();
      let allRecos:any = [...actualRecos, ...recos]
      if (allRecos.length !== 0){
        this._recoMovie$.next(allRecos);
      }
    });  
  }

  getRecoMovie$ ():Observable<RecoMovie[]> {
    return this._recoMovie$.asObservable();
  }
   
}