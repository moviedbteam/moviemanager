import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MovieModel } from '../shared/models/movie.model';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apitTmdb = environment.base_url_apiTmdb;

  private movies$:BehaviorSubject<any> = new BehaviorSubject([]);
  private movieDetail$:BehaviorSubject<any> = new BehaviorSubject([]);
  private indexPage:number = 1;
  
  private searchedMovies$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) { 
    console.log(this.movies$);
  }

  getMoviesFromApi():void {
    let urlApi = this.apitTmdb+'/discover/movie';
    let params = new HttpParams()
    .set('api_key', '267af5120325d394d4ce784b430c2043')
    .set('language', 'fr')
    .set('page', this.indexPage);

  
    this.http.get(urlApi, {params})
  
    .pipe(
      map((apiResponse:any)=> {
        return apiResponse.results.map( (movie: any) => new MovieModel(movie) )      
      })
    )
    
    .subscribe( (movies:MovieModel[]) => {
      console.log("objets mappés: ", movies)
      let actualMovies = this.movies$.getValue();
      let allMovies:any = [...actualMovies, ...movies];
    
      this.movies$.next(allMovies);
    });
    
    this.indexPage++;
  }

  searchMoviesFromApi(userSearch:string):void{
    let urlApi = 'https://api.themoviedb.org/3/search/movie';
    let params = new HttpParams()
    .set('api_key', '267af5120325d394d4ce784b430c2043')
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
  
  getDetailsFromApi(id:number):void{
    let urlApi = 'https://api.themoviedb.org/3/movie/';
    let params = new HttpParams()
    .set('api_key', '267af5120325d394d4ce784b430c2043')
    .set('language', 'fr')
    this.http.get(urlApi+id, {params})
    .pipe(
      map((apiResponse:any)=> new MovieModel(apiResponse) )
    )

    .subscribe( (movie:MovieModel) => this.movieDetail$.next(movie) );
  }

  getVideosFromApi(id:number){  
    let urlApi = 'https://api.themoviedb.org/3/movie/';
    let params = new HttpParams()
    .set('api_key', '267af5120325d394d4ce784b430c2043')
    .set('language', 'fr')
    return this.http.get(urlApi+id+'/videos', {params});
  }
  
  getMovies$ ():Observable<MovieModel[]> {
    return this.movies$.asObservable();
  }

  getMovieDetail$ ():Observable<MovieModel[]> {
    return this.movieDetail$.asObservable();
  }

  getSearchedMovies$ ():Observable<MovieModel[]> {
    return this.searchedMovies$.asObservable();
  }

  setSearchMovies$ (movies:MovieModel[]):void {
    this.searchedMovies$.next(movies);
  }

}
