export class DetailMovie {
  id: number;
  titre: string;
  resume: string;
  image_portrait: string;
  date: Date;
  duration: number;
  genres: Genre[] | any[];

  idWish: number = 0;
  
  idWatch: number = 0;
  viewingMood: number = 0;
  viewingPlace: string = "";
  viewingRate: number = 0;
  
  constructor(movieFromApi:any) {
    this.id = movieFromApi.id;
    this.titre = movieFromApi.title;
    this.resume = movieFromApi.overview;
    this.image_portrait = movieFromApi.poster_path;
    this.date = movieFromApi.release_date;
    this.duration = movieFromApi.runtime? movieFromApi.runtime : 0;
    this.genres = movieFromApi.genres?movieFromApi.genres:[];

    
    
  }
    
}

interface Genre {
    id:number;
    name:string;
}
  
// ATTRIBUT MOVIE NON UTILISE
// image_landscape: string;
// score: number;
//
// ATTRIBUT WISH NON UTILISE
// dateWish: Date;
// idCollection: number;
// idMovie: number;
// idUser: number;
//
// ATTRIBUT WASH NON UTILISE
// dateWatch: Date;
// duration: number;
// idCollection: number;
// idMovie: number;
// idUser: number;