import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';
import { TmdbMovie } from '../models/tmdb-movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  detailMovie:any = {};
  private indexPage:number = 1;

  /// REQUETES TMDB ///
  apiTmdb = environment.base_url_apiTmdb;
  apiKey = environment.apiKey_apiTmdb;
  apiTmdbSearchMoviesFromApi = '/search/movie';
  apiTmdbGetMoviesFromApi = '/discover/movie';
  apiTmdbGetDetailsFromApi = '/movie/';
  private _searchedMovies$:BehaviorSubject<any> = new BehaviorSubject([]);
  private _movies$:BehaviorSubject<any> = new BehaviorSubject([]);

  /// REQUETES BACK ///
  apiBack = environment.base_url_apiBack;
  apiBackGetDetailsFromApi = '/movie/detail/';
  apiPostWishMovie:string = '/wish/movie';
  apiGetWishMovies:string = '/movie/wishlist';
  apiPostWatchMovie:string = '/watch/movie';
  apiGetWatchMovies:string = '/movie/watchlist';
  private _watchesMovie$:BehaviorSubject<any> = new BehaviorSubject([]);
  private _wishesMovie$:BehaviorSubject<any> = new BehaviorSubject([]);
  
  /// OBSERVABLE EN COMMUN TMDB/BACK ///
  private _movieDetail$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) { }

  ////////////////////////////// SERVICES FOR SEARCHBAR //////////////////////////////
  searchMoviesFromApi(userSearch:string):void{
    let urlApi = this.apiTmdb+this.apiTmdbSearchMoviesFromApi;
    let apiKey = this.apiKey;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('query', userSearch);

    console.log (urlApi+'?api_key='+apiKey+'&language=fr&query='+userSearch);
    this.http.get(urlApi, {params})
    .pipe(
      map((apiResponse:any)=> {
        return apiResponse.results.map( (movie: any) => new TmdbMovie(movie) )
      })
    )
    .subscribe( (foundMovies:TmdbMovie[]) => this._searchedMovies$.next(foundMovies) );
  }
  getSearchedMovies$ ():Observable<TmdbMovie[]> {
    return this._searchedMovies$.asObservable();
  }
  setSearchMovies$ (movies:TmdbMovie[]):void {
    this._searchedMovies$.next(movies);
  }

  //////////////////// SERVICES FOR DISCOVER (SEEALL+ACTIONBAR) ////////////////////
  getMoviesFromApi():void {
    let urlApi = this.apiTmdb+this.apiTmdbGetMoviesFromApi;
    let apiKey = this.apiKey;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('page', this.indexPage);

    // console.log (urlApi+'?api_key='+apiKey+'&language=fr&page=1');
    this.http.get(urlApi, {params})
    .pipe(
      map((apiResponse:any)=> {
        // console.log(apiResponse)
        return apiResponse.results.map( (movie: any) => {
          // console.log(movie);
          return new TmdbMovie(movie) ;
          
        })
      })
    )
    .subscribe( (movies:TmdbMovie[]) => {
      let actualMovies = this._movies$.getValue();
      let allMovies:any = [...actualMovies, ...movies];
    
      this._movies$.next(allMovies);
    });
    this.indexPage++;
  }
  getMovies$ ():Observable<TmdbMovie[]> {
    return this._movies$.asObservable();
  }

  ///////////////////////// SERVICES FOR DETAILSHEET /////////////////////////
  getBackDetailsFromApi(id:number):void{
    this.http.get(this.apiBack+this.apiBackGetDetailsFromApi+id)
    .pipe(
      map((apiResponse:any)=> new Movie(apiResponse))
    )
    .subscribe( (movie:Movie) => {
      this.detailMovie = movie;
      this._movieDetail$.next(this.detailMovie)
    });
  }
  getTmdbDetailsFromApi(id:number):void{
    let urlApi = this.apiTmdb+this.apiTmdbGetDetailsFromApi;
    let apiKey = this.apiKey;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')

    this.http.get(urlApi+id, {params})
    .pipe(
      map((apiResponse:any)=> new TmdbMovie(apiResponse))
    )
    .subscribe( (movie:TmdbMovie) => {
      this.detailMovie = movie;
      this._movieDetail$.next(this.detailMovie)
    });
  }
  getMovieDetail$ ():Observable<Movie> {
    return this._movieDetail$.asObservable();
  }

  ////////////////////////////// SERVICES WISH //////////////////////////////
  postWishMovieToApi(postWishMovie: any) {
    return this.http.post(this.apiBack+this.apiPostWishMovie, postWishMovie, {observe: 'response', responseType: 'text'});
  }
  getWishMoviesFromApi() { 
    this.http.get(this.apiBack+this.apiGetWishMovies)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (wish: any) => new Movie(wish) )
      })
    )
    .subscribe((wishes:Movie[]) => {
      let actualWishes = this._wishesMovie$.getValue();
      let allWishes:any = [...actualWishes, ...wishes]
      if (allWishes.length !== 0){
        this._wishesMovie$.next(allWishes);
      }
    });
  }
  getWishesMovie$ ():Observable<Movie[]> {
    return this._wishesMovie$.asObservable();
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

  ////////////////////////////// SERVICES WATCH //////////////////////////////
  postWatchMovieToApi(postWatchMovie: any) {
    return this.http.post(this.apiBack+this.apiPostWatchMovie, postWatchMovie, {observe: 'response', responseType: 'text'} );
  }
  getWatchMoviesFromApi() {
    this.http.get(this.apiBack+this.apiGetWatchMovies)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (watch: any) => new Movie(watch) );
      })
    )
    .subscribe((watches:Movie[]) => {
      let actualWatches = this._watchesMovie$.getValue();
      let allWatches:any = [...actualWatches, ...watches]
      if (allWatches.length !== 0){ 
        this._watchesMovie$.next(allWatches);
      }
    });    
  }
  getWatchesMovie$ ():Observable<Movie[]> {
    return this._watchesMovie$.asObservable();
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




// A SUPPRIMER ?
  // private _tmdbMovieDetail$:BehaviorSubject<any> = new BehaviorSubject([]);
  // private _movieDetailWish$:Subject<any> = new Subject();
  // private _movieDetailWatch$:Subject<any> = new Subject();

  ///////////////////////////// A SUPPRIMER ???
  // getDetailsFromApi(id:number):void{
  //   let urlApi = this.apiTmdb+this.apiTmdbGetDetailsFromApi;
  //   let apiKey = this.apiKey;
  //   let params = new HttpParams()
  //   .set('api_key', apiKey)
  //   .set('language', 'fr')
    
  //   console.log (urlApi+id+'?api_key='+apiKey+'&language=fr');
  //   this.http.get(urlApi+id, {params})
    
  //   .pipe(
  //     map((apiResponse:any)=> new TmdbDetailMovie(apiResponse) )
  //   )

  //   .subscribe( (movie:TmdbDetailMovie) => {
  //     this._tmdbMovieDetail$.next(movie)
  //   });
  // }
  // getTmdbMovieDetail$ ():Observable<TmdbDetailMovie> {
  //   return this._tmdbMovieDetail$.asObservable();
  // }



  /// service pour overview A SUPPRIMER ?
  // getDetailsWishFromApi(id:number):void{
  //   let urlApi = this.apiTmdb+this.apiTmdbGetDetailsFromApi;
  //   let apiKey = this.apiKey;
  //   let params = new HttpParams()
  //   .set('api_key', apiKey)
  //   .set('language', 'fr')
    
  //   console.log (urlApi+id+'?api_key='+apiKey+'&language=fr');
  //   this.http.get(urlApi+id, {params})
    
  //   .pipe(
  //     map((apiResponse:any)=> new TmdbDetailMovie(apiResponse) )
  //   )

  //   .subscribe( (movie:TmdbDetailMovie) => {
  //     this._movieDetailWish$.next(movie)
  //   })
  //   ;
  // }
  // getMovieWishDetail$ ():Observable<TmdbDetailMovie> {
  //   return this._movieDetailWish$.asObservable();
  // }

  /// service pour overview A SUPPRIMER ?
  // getDetailsWatchFromApi(id:number):void{
  //   let urlApi = this.apiTmdb+this.apiTmdbGetDetailsFromApi;
  //   let apiKey = this.apiKey;
  //   let params = new HttpParams()
  //   .set('api_key', apiKey)
  //   .set('language', 'fr')
    
  //   console.log (urlApi+id+'?api_key='+apiKey+'&language=fr');
  //   this.http.get(urlApi+id, {params})
    
  //   .pipe(
  //     map((apiResponse:any)=> new TmdbDetailMovie(apiResponse) )
  //   )

  //   .subscribe( (movie:TmdbDetailMovie) => {
  //     this._movieDetailWatch$.next(movie)
  //   })
  //   ;
  // }
  // getMovieWatchDetail$ ():Observable<TmdbDetailMovie> {
  //   return this._movieDetailWatch$.asObservable();
  // }