export class RecoTv {

  idTv: number;
  originalName: string;
  posterPath: string;
  popularity: number;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  
  
  constructor(tvFromApi:any) {
    this.idTv = tvFromApi.idTv;
    this.originalName = tvFromApi.originalName;
    this.posterPath = tvFromApi.posterPath;
    this.popularity = tvFromApi.popularity;
    this.numberOfEpisodes = tvFromApi.numberOfEpisodes;
    this.numberOfSeasons = tvFromApi.numberOfSeasons;
  } 
}
