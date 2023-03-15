export class TmdbMovie {

  idMovie: number;
  title: string;
  originalTitle: string;
  popularity: number;
  backdropPath: string;
  posterPath: string;
  releaseDate: Date;
  adult: boolean;
  budget: number;
  homepage: string;
  overview: string;
  imdbID: string;
  originalLanguage: string;
  runtime: number;
  tagline: string;
  voteAverage: number;
  voteCount: number;
  status: string;
  genres: Genre[] | any[];
  idWatch: number = 0;
  viewingPlace: string = "";
  viewingRate: number = 0;
  viewingMood: number = 0;
  dateWatch: Date;
  idWish: number = 0;

  constructor(movieFromApi:any) {
    /// DIFFRENTS DE BACK ///
    this.idMovie = movieFromApi.id;
    this.backdropPath = movieFromApi.backdrop_path;
    this.posterPath = movieFromApi.poster_path;
    this.releaseDate = movieFromApi.release_date;
    this.voteAverage = movieFromApi.vote_average;
    this.genres = movieFromApi.genres?movieFromApi.genres:[];
    /// IDENTIQUES A BACK ///
    this.idWatch = movieFromApi.idWatch;
    this.idWish = movieFromApi.idWish;
    this.viewingPlace = movieFromApi.viewingPlace;
    this.viewingRate = movieFromApi.viewingRate;
    this.viewingMood = movieFromApi.viewingMood;
    this.dateWatch = movieFromApi.dateWatch;
    this.title = movieFromApi.title;
    this.originalTitle = movieFromApi.originalTitle;
    this.popularity = movieFromApi.popularity;
    this.adult = movieFromApi.adult;
    this.budget = movieFromApi.budget;
    this.homepage = movieFromApi.homepage;
    this.overview = movieFromApi.overview;
    this.imdbID = movieFromApi.imdbID;
    this.originalLanguage = movieFromApi.originalLanguage;
    this.runtime = movieFromApi.runtime? movieFromApi.runtime : 0;
    this.tagline = movieFromApi.tagline;
    this.voteCount = movieFromApi.voteCount;
    this.status = movieFromApi.status;
  }
}

interface Genre {
  id:number;
  name:string;
}