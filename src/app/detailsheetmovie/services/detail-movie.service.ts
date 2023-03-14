import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackDetailMovie } from '../models/back-detail-movie.model';
import { TmdbDetailMovie } from '../models/tmdb-detail-movie.model';

@Injectable({
  providedIn: 'root'
})
export class DetailMovieService {

  detailMovie:any = {};

  apiTmdb = environment.base_url_apiTmdb;
  apiKey = environment.apiKey_apiTmdb;
  apiTmdbGetDetailsFromApi = '/movie/';
  
  apiBack = environment.base_url_apiBack;
  apiBackGetDetailsFromApi = '/movie/detail/';
  apiPostWishMovie:string = '/wish/movie';
  apiGetWishMovies:string = '/wish/movie/all';
  apiPostWatchMovie:string = '/watch/movie';
  apiGetWatchMovies:string = '/watch/movie/all';

  private _movieDetail$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) { }

  getBackDetailsFromApi(id:number):void{
    this.http.get(this.apiBack+this.apiBackGetDetailsFromApi+id)
    .pipe(
      map((apiResponse:any)=> new BackDetailMovie(apiResponse))
    )
    .subscribe( (movie:BackDetailMovie) => {
      this.detailMovie = movie;
      this._movieDetail$.next(this.detailMovie)
    });
  }
  
  getTmdbDetailsFromApi(id:number):void{
    let params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('language', 'fr')

    this.http.get(this.apiTmdb+this.apiTmdbGetDetailsFromApi+id, {params})
    .pipe(
      map((apiResponse:any)=> new TmdbDetailMovie(apiResponse))
    )
    .subscribe( (movie:TmdbDetailMovie) => {
      this.detailMovie = movie;
      this._movieDetail$.next(this.detailMovie)
    });
  }

  getMovieDetail$ ():Observable<BackDetailMovie> {
    return this._movieDetail$.asObservable();
  }

  delWishMovie() {
    this.http.delete(this.apiBack+this.apiPostWishMovie+"/"+this.detailMovie.idWish, {observe: 'response', responseType: 'text'})
    .subscribe({
      next: (response:any) => {
        if(response.status == "200") {
          this.detailMovie.idWish = 0;
          this._movieDetail$.next(this.detailMovie);
        }
      },
      error: error => console.error(error)
    });
  }

  delWatchMovie() {
    this.http.delete(this.apiBack+this.apiPostWatchMovie+"/"+this.detailMovie.idWatch, {observe: 'response', responseType: 'text'} )
    .subscribe({
      next: (response:any) => {
        if(response.status == "200") {
          this.detailMovie.idWatch = 0;
          this._movieDetail$.next(this.detailMovie);
        }
      },
      error: error => console.error(error)
    });
  }
}


// getTmdbDetailsFromApi(id:number):void{
//   let params = new HttpParams()
//   .set('api_key', this.apiKey)
//   .set('language', 'fr')

//   this.http.get(this.apiTmdb+this.apiTmdbGetDetailsFromApi+id, {params})
//   .pipe(
//     map((apiResponse:any)=> new DetailMovie(apiResponse))
//   )
//   .subscribe( (movie:DetailMovie) => {
//     this.detailMovie = movie;
//     console.log("this.detailMovie : ");
//     console.log(this.detailMovie);
//     this._movieDetail$.next(this.detailMovie)
//   });
  // this.http.get(this.apiBack+this.apiGetWishMovies)
  // .pipe(
  //   map((apiResponse:any) => {
  //     return apiResponse.map( (wish: any) => new DetailMovie(wish) )
  //   })
  // )
  // .subscribe((wishes:DetailMovie[]) => {
  //   for (let wish of wishes) {
  //     if (wish.idMovie == id) {
  //       this.detailMovie.idWish = wish.idWish;
  //     }
  //   }
  //   this.movieDetail$.next(this.detailMovie);
  // });

  // this.http.get(this.apiBack+this.apiGetWatchMovies)
  // .pipe(
  //   map((apiResponse:any) => {
  //     return apiResponse.map( (watch: any) => new DetailMovie(watch) );
  //   })
  // )
  // .subscribe((watches:DetailMovie[]) => {
  //   for (let watch of watches) {
  //     if (watch.idMovie == id) {
  //       this.detailMovie.idWatch = watch.idWatch;
  //     }
  //   }
  //   this.movieDetail$.next(this.detailMovie);
  // });  
// }
