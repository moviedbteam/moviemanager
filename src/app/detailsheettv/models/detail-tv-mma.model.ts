interface tvGenreMma {
    id:number;
    name:string;
}

export class DetailTvMmaModel {

  id: number;
  title: string;
  resume: string;
  posterPath: string;
  backdropPath: string;
  firstAirDate: Date;
  lastAirDate: Date;
  homePage: string;
  nbEpisodes: number;
  nbSeasons: number;
  popularity: number;
  status:string;
  voteAverage: number;
  voteCount: number;
  genres: tvGenreMma[] | any[];

  idWish: number = 0;
  idWatch: number = 0;
  
  viewingMood: number = 0;
  viewingPlace: string = "";
  viewingRate: number = 0;
  
  constructor(tvFromApiBack:any) {
    this.id = tvFromApiBack.id_tv;
    this.title = tvFromApiBack.original_name;
    this.resume = tvFromApiBack.overview;
    this.posterPath = tvFromApiBack.poster_path;
    this.backdropPath = tvFromApiBack.backdrop_path;
    this.firstAirDate = tvFromApiBack.first_air_date;
    this.lastAirDate = tvFromApiBack.last_air_date;
    this.homePage = tvFromApiBack.homepage;
    this.nbEpisodes = tvFromApiBack.number_of_episodes;
    this.nbSeasons = tvFromApiBack.number_of_seasons;
    this.popularity = tvFromApiBack.popularity;
    this.status = tvFromApiBack.status;
    this.voteAverage = tvFromApiBack.vote_average;
    this.voteCount = tvFromApiBack.vote_count;
    this.genres = tvFromApiBack.genres?tvFromApiBack.genres:[];

    this.idWish = tvFromApiBack.id_wish;
    this.idWatch = tvFromApiBack.id_watch;

    this.viewingMood = tvFromApiBack.viewing_mood;
    this.viewingPlace = tvFromApiBack.viewing_place;
    this.viewingRate = tvFromApiBack.viewing_rate;

  }
    
}