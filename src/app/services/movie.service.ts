import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieModel } from '../shared/models/movie.model';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apitTmdb = environment.base_url_apiTmdb;
  apiKeyTmdb = environment.apiKey_apiTmdb;

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
    let urlApi = this.apitTmdb+'/discover/movie';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('page', this.indexPage);

    // console.log (urlApi+'?api_key='+apiKey+'&language=fr&page=1');

    this.http.get(urlApi, {params})
  
    .pipe(
      map((apiResponse:any)=> {
        return apiResponse.results.map( (movie: any) => new MovieModel(movie) )      
      })
    )
    
    .subscribe( (movies:MovieModel[]) => {
      let actualMovies = this.movies$.getValue();
      let allMovies:any = [...actualMovies, ...movies];
    
      this.movies$.next(allMovies);
    });
    
    this.indexPage++;
  }

  getMovies$ ():Observable<MovieModel[]> {
    return this.movies$.asObservable();
  }

  getDetailsFromApi(id:number):void{
    let urlApi = this.apitTmdb+'/movie/';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    
    this.http.get(urlApi+id, {params})
    
    .pipe(
      map((apiResponse:any)=> new MovieModel(apiResponse) )
    )

    .subscribe( (movie:MovieModel) => {
      this.movieDetail$.next(movie)
    });
  }

  // getMovieDetail$ ():Observable<MovieModel[]> {
  getMovieDetail$ ():Observable<MovieModel> {
    return this.movieDetail$.asObservable();
  }

  getDetailsWishFromApi(id:number):void{
    let urlApi = this.apitTmdb+'/movie/';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    
    this.http.get(urlApi+id, {params})
    
    .pipe(
      map((apiResponse:any)=> new MovieModel(apiResponse) )
    )

    .subscribe( (movie:MovieModel) => {
      this.movieDetailWish$.next(movie)
    })
    ;
  }

  getMovieWishDetail$ ():Observable<MovieModel> {
    return this.movieDetailWish$.asObservable();
  }

  getDetailsWatchFromApi(id:number):void{
    let urlApi = this.apitTmdb+'/movie/';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    
    this.http.get(urlApi+id, {params})
    
    .pipe(
      map((apiResponse:any)=> new MovieModel(apiResponse) )
    )

    .subscribe( (movie:MovieModel) => {
      this.movieDetailWatch$.next(movie)
    })
    ;
  }

  getMovieWatchDetail$ ():Observable<MovieModel> {
    return this.movieDetailWatch$.asObservable();
  }

  searchMoviesFromApi(userSearch:string):void{
    let urlApi = this.apitTmdb+'/search/movie';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('query', userSearch);

    this.http.get(urlApi, {params})
    
    .pipe(
      map((apiResponse:any)=> {
        return apiResponse.results.map( (movie: any) => new MovieModel(movie) )
      })
    )
    .subscribe( (foundMovies:MovieModel[]) => this.searchedMovies$.next(foundMovies) );
  }

  getSearchedMovies$ ():Observable<MovieModel[]> {
    return this.searchedMovies$.asObservable();
  }

  setSearchMovies$ (movies:MovieModel[]):void {
    this.searchedMovies$.next(movies);
  }

  getVideosFromApi(id:number){  
    let urlApi = this.apitTmdb+'/movie/';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    return this.http.get(urlApi+id+'/videos', {params});
  }
  
}
