export class BackDetailMovie {

  // id: number;
  idMovie: number;
  // titre: string;
  title: string;
  originalTitle: string;
  popularity: number;
  // image_landscape: string;
  // backdrop_Path: string;
  backdropPath: string;
  // image_portrait: string;
  posterPath: string;
  // date: Date;
  // poster_path: Date;
  // release_date: Date;
  releaseDate: Date;
  adult: boolean;
  budget: number;
  homepage: string;
  // resume: string;
  overview: string;
  imdbID: string;
  originalLanguage: string;
  // duration: number;
  runtime: number;
  tagline: string;
  // score: number;
  // vote_average: number;
  voteAverage: number;
  voteCount: number;
  status: string;
  // genreMovieDtoList: Genre[] | any[];
  genres: Genre[] | any[];
  idWatch: number = 0;
  viewingPlace: string = "";
  viewingRate: number = 0;
  viewingMood: number = 0;
  dateWatch: Date;
  idWish: number = 0;

  constructor(movieFromApi:any) {

    this.idMovie = movieFromApi.idMovie;
    // this.id = movieFromApi.id;
    // this.titre = movieFromApi.title;
    this.title = movieFromApi.title;
    this.originalTitle = movieFromApi.originalTitle;
    this.popularity = movieFromApi.popularity;
    this.backdropPath = movieFromApi.backdropPath;
    // this.backdrop_Path = movieFromApi.backdrop_path;
    this.posterPath = movieFromApi.posterPath;
    // this.poster_path = movieFromApi.poster_path;
    this.releaseDate = movieFromApi.releaseDate;
    // this.release_date = movieFromApi.release_date;
    this.adult = movieFromApi.adult;
    this.budget = movieFromApi.budget;
    this.homepage = movieFromApi.homepage;
    // this.resume = movieFromApi.overview;
    this.overview = movieFromApi.overview;
    this.imdbID = movieFromApi.imdbID;
    this.originalLanguage = movieFromApi.originalLanguage;
    this.runtime = movieFromApi.runtime;
    this.runtime = movieFromApi.runtime? movieFromApi.runtime : 0;
    this.tagline = movieFromApi.tagline;
    this.voteAverage = movieFromApi.voteAverage;
    // this.vote_average = movieFromApi.vote_average;
    this.voteCount = movieFromApi.voteCount;
    this.status = movieFromApi.status;
    this.genres = movieFromApi.genreMovieDtoList?movieFromApi.genreMovieDtoList:[];
    // this.genres = movieFromApi.genres?movieFromApi.genres:[];
    this.idWatch = movieFromApi.idWatch;
    this.viewingPlace = movieFromApi.viewingPlace;
    this.viewingRate = movieFromApi.viewingRate;
    this.viewingMood = movieFromApi.viewingMood;
    this.dateWatch = movieFromApi.dateWatch;
    this.idWish = movieFromApi.idWish;
    
  }  
    
}

interface Genre {
    id:number;
    name:string;
}

