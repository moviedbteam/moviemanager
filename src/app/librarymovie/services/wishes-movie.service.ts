import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WishesMovie } from '../models/wishes-movie.model';

@Injectable({
  providedIn: 'root'
})
export class WishesMovieService {

  apiBack = environment.base_url_apiBack;
  apiGetWishMovies:string = '/movie/wishlist';
  private _wishesMovie$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
  ) { }

  getWishMoviesFromApi() {
    
    this.http.get(this.apiBack+this.apiGetWishMovies)
    
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (wish: any) => new WishesMovie(wish) )
      })
    )

    .subscribe((wishes:WishesMovie[]) => {
      let actualWishes = this._wishesMovie$.getValue();
      let allWishes:any = [...actualWishes, ...wishes]
      if (allWishes.length !== 0){
        this._wishesMovie$.next(allWishes);
      }
    });
  }

  getWishesMovie$ ():Observable<WishesMovie[]> {
    return this._wishesMovie$.asObservable();
  }
}
