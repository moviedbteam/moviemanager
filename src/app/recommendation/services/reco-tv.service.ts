import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecoTv } from '../models/reco-tv.model';

@Injectable({
  providedIn: 'root'
})
export class RecoTvService {
  
  apiBack = environment.base_url_apiBack;
  apiGetRecoTvs:string = '/recommendation/tv';
  private _recoTv$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) { }

  getRecoTvFromApi(){

    this.http.get(this.apiBack+this.apiGetRecoTvs)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (reco: any) => new RecoTv(reco) );
      })
    )
    .subscribe((recos:RecoTv[]) => {

      let actualRecos = this._recoTv$.getValue();
      let allRecos:any = [...actualRecos, ...recos]
      if (allRecos.length !== 0){
        this._recoTv$.next(allRecos);
      }
    });  
  }

  getRecoTv$ ():Observable<RecoTv[]> {
    return this._recoTv$.asObservable();
  }

}
