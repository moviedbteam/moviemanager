import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TmdbDetailMovie } from '../detailsheetmovie/models/tmdb-detail-movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apitTmdb = environment.base_url_apiTmdb;
  apiKeyTmdb = environment.apiKey_apiTmdb;
  apigetDetailsFromApi = this.apitTmdb+'/movie/';
  apiSearchMoviesFromApi = this.apitTmdb+'/search/movie';
  apiGetMoviesFromApi = this.apitTmdb+'/discover/movie';

  private movies$:BehaviorSubject<any> = new BehaviorSubject([]);
  private movieDetail$:BehaviorSubject<any> = new BehaviorSubject([]);
  private movieDetailWish$:Subject<any> = new Subject();
  private movieDetailWatch$:Subject<any> = new Subject();
  private indexPage:number = 1;
  
  private searchedMovies$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) {}

  getMoviesFromApi():void {
    let urlApi = this.apiGetMoviesFromApi;
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('page', this.indexPage);

    console.log (urlApi+'?api_key='+apiKey+'&language=fr&page=1');
    this.http.get(urlApi, {params})
  
    .pipe(
      map((apiResponse:any)=> {
        console.log(apiResponse)
        return apiResponse.results.map( (movie: any) => {
          console.log(movie);
          return new TmdbDetailMovie(movie) ;
          
        })
      })
    )
    
    .subscribe( (movies:TmdbDetailMovie[]) => {
      let actualMovies = this.movies$.getValue();
      let allMovies:any = [...actualMovies, ...movies];
    
      this.movies$.next(allMovies);
    });
    
    this.indexPage++;
  }

  getMovies$ ():Observable<TmdbDetailMovie[]> {
    return this.movies$.asObservable();
  }

  getDetailsFromApi(id:number):void{
    let urlApi = this.apigetDetailsFromApi;
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    
    console.log (urlApi+id+'?api_key='+apiKey+'&language=fr');
    this.http.get(urlApi+id, {params})
    
    .pipe(
      map((apiResponse:any)=> new TmdbDetailMovie(apiResponse) )
    )

    .subscribe( (movie:TmdbDetailMovie) => {
      this.movieDetail$.next(movie)
    });
  }

  getMovieDetail$ ():Observable<TmdbDetailMovie> {
    return this.movieDetail$.asObservable();
  }

  getDetailsWishFromApi(id:number):void{
    let urlApi = this.apigetDetailsFromApi;
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    
    console.log (urlApi+id+'?api_key='+apiKey+'&language=fr');
    this.http.get(urlApi+id, {params})
    
    .pipe(
      map((apiResponse:any)=> new TmdbDetailMovie(apiResponse) )
    )

    .subscribe( (movie:TmdbDetailMovie) => {
      this.movieDetailWish$.next(movie)
    })
    ;
  }

  getMovieWishDetail$ ():Observable<TmdbDetailMovie> {
    return this.movieDetailWish$.asObservable();
  }

  getDetailsWatchFromApi(id:number):void{
    let urlApi = this.apigetDetailsFromApi;
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    
    console.log (urlApi+id+'?api_key='+apiKey+'&language=fr');
    this.http.get(urlApi+id, {params})
    
    .pipe(
      map((apiResponse:any)=> new TmdbDetailMovie(apiResponse) )
    )

    .subscribe( (movie:TmdbDetailMovie) => {
      this.movieDetailWatch$.next(movie)
    })
    ;
  }

  getMovieWatchDetail$ ():Observable<TmdbDetailMovie> {
    return this.movieDetailWatch$.asObservable();
  }

  searchMoviesFromApi(userSearch:string):void{
    let urlApi = this.apiSearchMoviesFromApi;
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('query', userSearch);

    console.log (urlApi+'?api_key='+apiKey+'&language=fr&query='+userSearch);
    this.http.get(urlApi, {params})
    
    .pipe(
      map((apiResponse:any)=> {
        return apiResponse.results.map( (movie: any) => new TmdbDetailMovie(movie) )
      })
    )
    .subscribe( (foundMovies:TmdbDetailMovie[]) => this.searchedMovies$.next(foundMovies) );
  }

  getSearchedMovies$ ():Observable<TmdbDetailMovie[]> {
    return this.searchedMovies$.asObservable();
  }

  setSearchMovies$ (movies:TmdbDetailMovie[]):void {
    this.searchedMovies$.next(movies);
  }

  getVideosFromApi(id:number){  
    let urlApi = this.apigetDetailsFromApi;
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    console.log (urlApi+id+'/videos'+'?api_key='+apiKey+'&language=fr&page=1');
    return this.http.get(urlApi+id+'/videos', {params});
  }
  
}
