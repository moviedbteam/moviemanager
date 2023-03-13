import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { WatchesMovie } from 'src/app/librarymovie/models/watches-movie.model';
import { WishesMovie } from 'src/app/librarymovie/models/wishes-movie.model';
import { environment } from 'src/environments/environment';
import { DetailMovie } from '../models/detail-movie.model';

@Injectable({
  providedIn: 'root'
})
export class DetailMovieService {

  detailMovie:any = {};

  apitTmdb = environment.base_url_apiTmdb;
  apiKey = environment.apiKey_apiTmdb;
  urlApi = this.apitTmdb+'/movie/';
  
  apiBack = environment.base_url_apiBack;
  apiPostWishMovie:string = '/wish/movie';
  apiGetWishMovies:string = '/wish/movie/all';
  apiPostWatchMovie:string = '/watch/movie';
  apiGetWatchMovies:string = '/watch/movie/all';

  private movieDetail$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) { }

  getDetailsFromApi(id:number):void{
    let params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('language', 'fr')
    
    this.http.get(this.urlApi+id, {params})
    .pipe(
      map((apiResponse:any)=> new DetailMovie(apiResponse))
    )
    .subscribe( (movie:DetailMovie) => {
      this.detailMovie = movie;
      console.log("this.detailMovie : ");
      console.log(this.detailMovie);
      this.movieDetail$.next(this.detailMovie)
    });

    this.http.get(this.apiBack+this.apiGetWishMovies)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (wish: any) => new WishesMovie(wish) )
      })
    )
    .subscribe((wishes:WishesMovie[]) => {
      for (let wish of wishes) {
        if (wish.idMovie == id) {
          this.detailMovie.idWish = wish.idWish;
        }
      }
      this.movieDetail$.next(this.detailMovie);
    });

    this.http.get(this.apiBack+this.apiGetWatchMovies)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (watch: any) => new WatchesMovie(watch) );
      })
    )
    .subscribe((watches:WatchesMovie[]) => {
      for (let watch of watches) {
        if (watch.idMovie == id) {
          this.detailMovie.idWatch = watch.idWatch;
        }
      }
      this.movieDetail$.next(this.detailMovie);
    });  

  }

  delWishMovie() {
    // return this.http.delete(this.apiBack+this.apiPostWishMovie+"/"+idWishMovie, {observe: 'response', responseType: 'text'});
    this.http.delete(this.apiBack+this.apiPostWishMovie+"/"+this.detailMovie.idWish, {observe: 'response', responseType: 'text'})
    .subscribe({
      next: (response:any) => {
        console.log(response)
        if(response.status == "202") {
          this.detailMovie.idWish = 0;
          this.movieDetail$.next(this.detailMovie);
        }
      },
      error: error => console.error(error)
    });
  }

  delWatchMovie() {
    // return this.http.delete(this.apiBack+this.apiPostWatchMovie+"/"+idWatchMovie, {observe: 'response', responseType: 'text'} );
    this.http.delete(this.apiBack+this.apiPostWatchMovie+"/"+this.detailMovie.idWatch)
    .subscribe({
      next: (response:any) => {
        console.log(response)
        if(response.status == "201") {
          this.detailMovie.idWatch = 0;
          this.movieDetail$.next(this.detailMovie);
        }
      },
      error: error => console.error(error)
    });
  }
   
  getMovieDetail$ ():Observable<DetailMovie> {
    return this.movieDetail$.asObservable();
  }


}
