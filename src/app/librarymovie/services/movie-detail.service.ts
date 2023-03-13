import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Moviedetail } from '../models/moviedetail.model';
import { WatchesMovie } from '../models/watches-movie.model';
import { WishesMovie } from '../models/wishes-movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {

  detailMovie:any = {};
  
  apiBack = environment.base_url_apiBack;
  apiPostWishMovie:string = '/wish/movie/';
  // apiGetWishMovies:string = '/wish/movie/all';
  apiPostWatchMovie:string = '/watch/movie/';
  // apiGetWatchMovies:string = '/watch/movie/all';
  
  // apitTmdb = environment.base_url_apiTmdb;
  // apiKey = environment.apiKey_apiTmdb;
  urlApi = this.apiBack+'/movie/detail/';
  
  private detailMovie$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) { }

  getDetailsFromApi(id:number):void{
    
    this.http.get(this.urlApi+id)
    .pipe(
      map((apiResponse:any)=> new Moviedetail(apiResponse))
    )
    .subscribe( (movie:Moviedetail) => {
      console.log("movie : ");
      console.log(movie);
      this.detailMovie = movie;
      console.log("this.detailMovie : ");
      console.log(this.detailMovie);
      this.detailMovie$.next(this.detailMovie)
    });

    // this.http.get(this.apiBack+this.apiGetWishMovies)
    // .pipe(
    //   map((apiResponse:any) => {
    //     return apiResponse.map( (wish: any) => new WishesMovie(wish) )
    //   })
    // )
    // .subscribe((wishes:WishesMovie[]) => {
    //   for (let wish of wishes) {
    //     if (wish.idMovie == id) {
    //       this.detailMovie.idWish = wish.idWish;
    //     }
    //   }
    //   this.detailMovie$.next(this.detailMovie);
    // });

    // this.http.get(this.apiBack+this.apiGetWatchMovies)
    // .pipe(
    //   map((apiResponse:any) => {
    //     return apiResponse.map( (watch: any) => new WatchesMovie(watch) );
    //   })
    // )
    // .subscribe((watches:WatchesMovie[]) => {
    //   for (let watch of watches) {
    //     console.log("watch : ");
    //     console.log(watch);
    //     if (watch.idMovie == id) {
    //       this.detailMovie.idWatch = watch.idWatch;
    //     }
    //   }
    //   console.log("this.detailMovie : ");
    //   console.log(this.detailMovie);
    //   this.detailMovie$.next(this.detailMovie);
      
    // });  

  }

  delWishMovie() {
    // return this.http.delete(this.apiBack+this.apiPostWishMovie+"/"+idWishMovie, {observe: 'response', responseType: 'text'});
    this.http.delete(this.apiBack+this.apiPostWishMovie+this.detailMovie.idWish)
    .subscribe({
      next: (response:any) => {
        console.log(response)
        // console.log(response.status)
        // if(response.status == "201") {
        //   this.detailMovie.idWish = null;
        //   this.detailMovie$.next(this.detailMovie);
        // }
      },
      error: error => console.error(error)
    });
  }

  delWatchMovie() {
    // return this.http.delete(this.apiBack+this.apiPostWatchMovie+"/"+idWatchMovie, {observe: 'response', responseType: 'text'} );
    console.log("delWatchMovie");
    this.http.delete(this.apiBack+this.apiPostWatchMovie+this.detailMovie.idWatch)
    .subscribe({
      next: (response:any) => {
        console.log(response);
        // console.log(response.status);
        // if(response.status == "200") {
        //   this.detailMovie.idWatch = null;
        //   this.detailMovie$.next(this.detailMovie);
        // }
      },
      error: error => console.error(error)
    });
    console.log(this.detailMovie);
  }
   
  getMovieDetail$ ():Observable<Moviedetail> {
    return this.detailMovie$.asObservable();
  }

}
