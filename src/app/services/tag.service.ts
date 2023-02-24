import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  ApiPostWishMovie:string = 'http://localhost:8080/api/wish/movie';
  ApiPostWatchMovie:string = 'http://localhost:8080/api/watch/movie';
  
  ApiGetAllWishMovies:string = 'http://localhost:8080/api/wish/movies';
  ApiGetAllWatchMovies:string = 'http://localhost:8080/api/watch/movies';


  constructor(
    private http:HttpClient,
  ) { }

  postWishMovieToApi(postWishMovie: any) {
    console.log(postWishMovie);  
    return this.http.post(this.ApiPostWishMovie, postWishMovie, {observe: 'response', responseType: 'text'});
  }

  postWatchMovieToApi(postWatchMovie: any) {
    console.log(postWatchMovie);  
    return this.http.post(this.ApiPostWatchMovie, postWatchMovie, {observe: 'response', responseType: 'text'} );
  }

  getAllWishMoviesFromApi() {
    return this.http.get(this.ApiGetAllWishMovies);
  }

  getAllWatchMoviesFromApi() {
    return this.http.get(this.ApiGetAllWatchMovies);
  }

}
