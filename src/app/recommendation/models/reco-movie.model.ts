export class RecoMovie {

  idMovie: number;
  title: string;
  posterPath: string;
  popularity: number;
  
  constructor(movieFromApi:any) {
    this.idMovie = movieFromApi.idMovie;
    this.title = movieFromApi.title;
    this.posterPath = movieFromApi.posterPath;
    this.popularity = movieFromApi.popularity;
  } 
}