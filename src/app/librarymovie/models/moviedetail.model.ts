export class Moviedetail {

  idMovie: number;
  // "idMovie": 1077280,
  // id: number;
  title: string;
  // "title": "Die Hart",
  // titre: string;
  originalTitle: string;
  // "originalTitle": null,
  popularity: number;
  // "popularity": 2550.267,
  backdropPath: string;
  // "backdropPath": "/pxJbfnMIQQxCrdeLD0zQnWr6ouL.jpg",
  posterPath: string;
  // "posterPath": "/1EnBjTJ5utgT1OXYBZ8YwByRCzP.jpg",
  // image_portrait: string;
  releaseDate: Date;
  // "releaseDate": "2023-02-22",
  // date: Date;
  adult: boolean;
  // "adult": false,
  budget: number;
  // "budget": 0,
  homepage: string;
  // "homepage": "",
  overview: string;
  // "overview": "Kevin Hart, qui joue son propre rôle, se lance dans une quête périlleuse pour devenir une star de films d'action. Et avec l'aide de John Travolta, Nathalie Emmanuel et Josh Hartnett, il pourrait bien y parvenir.",
  // resume: string;
  imdbID: string;
  // "imdbID": "tt26198528",
  originalLanguage: string;
  // "originalLanguage": "en",
  runtime: number;
  // "runtime": 85,
  // duration: number;
  tagline: string;
  // "tagline": "",
  voteAverage: number;
  // "voteAverage": 6.32,
  voteCount: number;
  // "voteCount": 153,
  status: string;
  // "status": "Released",
  genreMovieDtoList: Genre[] | any[];
  // "genreMovieDtoList": [
  //   {
  //     "id": 28,
  //     "name": "Action"
  //   },
  //   {
  //     "id": 35,
  //     "name": "Comédie"
  //   },
  //   {
  //     "id": 53,
  //     "name": "Thriller"
  //   }
  // ],
  // genres: Genre[] | any[];
  idWatch: number = 0;
  // "idWatch": 16,
  // idWatch: number = 0;
  viewingPlace: string = "";
  // "viewingPlace": "cinéma",
  // viewingPlace: string = "";
  viewingRate: number = 0;
  // "viewingRate": 5,
  // viewingRate: number = 0;
  viewingMood: number = 0;
  // "viewingMood": 1,
  // viewingMood: number = 0;
  dateWatch: Date;
  // "dateWatch": "2022-07-28",
  idWish: number = 0;
  // "idWish": null
  // idWish: number = 0;

  constructor(movieFromApi:any) {
    
    this.idMovie = movieFromApi.idMovie;
    // this.id = movieFromApi.id;
    this.title = movieFromApi.title;
    // this.titre = movieFromApi.title;
    this.originalTitle = movieFromApi.originalTitle;
    this.popularity = movieFromApi.popularity;
    this.backdropPath = movieFromApi.backdropPath;
    this.posterPath = movieFromApi.posterPath;
    // this.image_portrait = movieFromApi.poster_path;
    this.releaseDate = movieFromApi.releaseDate;
    // this.date = movieFromApi.release_date;
    this.adult = movieFromApi.adult;
    this.budget = movieFromApi.budget;
    this.homepage = movieFromApi.homepage;
    this.overview = movieFromApi.overview;
    // this.resume = movieFromApi.overview;
    this.imdbID = movieFromApi.imdbID;
    this.originalLanguage = movieFromApi.originalLanguage;
    this.runtime = movieFromApi.runtime;
    // this.duration = movieFromApi.runtime? movieFromApi.runtime : 0;
    this.tagline = movieFromApi.tagline;
    this.voteAverage = movieFromApi.voteAverage;
    this.voteCount = movieFromApi.voteCount;
    this.status = movieFromApi.status;
    this.genreMovieDtoList = movieFromApi.genreMovieDtoList?movieFromApi.genreMovieDtoList:[];
    // genreMovieDtoList: Genre[] | any[];
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
