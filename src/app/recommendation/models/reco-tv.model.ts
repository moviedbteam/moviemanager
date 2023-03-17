export class RecoTv {

  idTv: number;
  originalName: string;
  posterPath: string;
  popularity: number;
  numberOfEpisodes: number;
  numberOfSeasons: number;

  idWatch: number = 0;
  idWish: number = 0;
  _wishStatusIcon: string = "fa-regular fa-bookmark fa-lg";
  _wishTitleIcon: string = "Ajouter à la Wish liste";
  _watchStatusIcon: string = "fa-regular fa-eye-slash fa-lg";
  _watchTitleIcon: string = "Marquer comme 'Vus'";
  _blackStatusIcon: string = "fa-solid fa-ban fa-lg";
  _blackTitleIcon: string = "Ne plus recommander";
  
  
  constructor(tvFromApi:any) {
    this.idTv = tvFromApi.idTv;
    this.originalName = tvFromApi.originalName;
    this.posterPath = tvFromApi.posterPath;
    this.popularity = tvFromApi.popularity;
    this.numberOfEpisodes = tvFromApi.numberOfEpisodes;
    this.numberOfSeasons = tvFromApi.numberOfSeasons;
  } 
}
