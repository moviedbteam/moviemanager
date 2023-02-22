import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  API_TAG:string = 'http://localhost:8080/api/wish/movie';

  constructor(
    private http:HttpClient,
  ) { }

  // postWishToApi(movieWish:any) {

  //   console.log (movieWish);

  //   return this.http.post(this.API_TAG, { data : movieWish});
  // }

  postWishToApi(movieWish: any) {
    console.log(movieWish);
  
    // const jsonMovieWish = JSON.stringify(movieWish);

    console.log(movieWish);
  
    // return this.http.post(this.API_TAG, { data: jsonMovieWish });
    // return this.http.post(this.API_TAG, { idUser:"324827", idMovie:11, idCollection:1313 } );
    return this.http.post(this.API_TAG, movieWish);
  }
  

}
