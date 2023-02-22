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

  postWishToApi(movieWish:any) {

    console.log (movieWish);

    return this.http.post(this.API_TAG, { data : movieWish});
  }

}
