export class RecoTv {

  idTv: number;
  title: string;
  posterPath: string;
  popularity: number;
  
  constructor(tvFromApi:any) {
    this.idTv = tvFromApi.idMovie;
    this.title = tvFromApi.title;
    this.posterPath = tvFromApi.posterPath;
    this.popularity = tvFromApi.popularity;
  } 
}
