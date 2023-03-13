interface tvGenreTmdbInterface {
    idTmdb:number;
    name:string;
}

interface tvSeasonTmdbInterface {
  id:number;
  air_date:Date;
  poster_path: string;
  season_number: number;
  episode_count: number;
  overview: string;
}




export class DetailTvTmdbModel {

  idTmdb: number;
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
  genres: tvGenreTmdbInterface[] | any[];
  seasons: tvSeasonTmdbInterface[] | any[];
  
  constructor(tvFromApiTmdb:any) {

    this.idTmdb = tvFromApiTmdb.id;
    this.title = tvFromApiTmdb.original_name;
    this.resume = tvFromApiTmdb.overview;
    this.posterPath = tvFromApiTmdb.poster_path;
    this.backdropPath = tvFromApiTmdb.backdrop_path;
    this.firstAirDate = tvFromApiTmdb.first_air_date;
    this.lastAirDate = tvFromApiTmdb.last_air_date;
    this.homePage = tvFromApiTmdb.homepage;
    this.nbEpisodes = tvFromApiTmdb.number_of_episodes;
    this.nbSeasons = tvFromApiTmdb.number_of_seasons;
    this.popularity = tvFromApiTmdb.popularity;
    this.status = tvFromApiTmdb.status;
    this.voteAverage = tvFromApiTmdb.vote_average;
    this.voteCount = tvFromApiTmdb.vote_count;
    this.genres = tvFromApiTmdb.genres?tvFromApiTmdb.genres:[];
    this.seasons = tvFromApiTmdb.seasons?tvFromApiTmdb.seasons:[];

  }
    
}


interface tvEpisodeTmdbInterface {
  id: number;
  air_date: Date;
  episode_number: number;
  name: string;
  overview: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
}

export class DetailSeasonTmdbModel {

  idTmdb: number;
  name: string;
  poster_path: string;
  season_number: number;
  overview: string;
  air_date: Date;
  episodes: tvEpisodeTmdbInterface[] | any[];


  constructor(seasonsFromApiTmdb:any) {

    this.idTmdb = seasonsFromApiTmdb.id;
    this.name = seasonsFromApiTmdb.name;
    this.overview = seasonsFromApiTmdb.overview;
    this.poster_path = seasonsFromApiTmdb.poster_path;
    this.season_number = seasonsFromApiTmdb.season_number;
    this.air_date = seasonsFromApiTmdb.air_date;
    this.episodes = seasonsFromApiTmdb.episodes?seasonsFromApiTmdb.episodes:[];
  }


}




