export class WishesMovie {

  // idCollection: number;
  // idUser: number;
  
  idMovie: number;
  // "idMovie": 631842,
  title: string;
  // "title": "Knock at the Cabin",
  posterPath: string;
  // "posterPath": "/ft72CljIa6FH9uQAEant5DqjINg.jpg",
  idWatch: number;
  // "idWatch": null,
  viewingPlace: string;
  // "viewingPlace": null,
  viewingRate: number;
  // "viewingRate": null,
  viewingMood: number;
  // "viewingMood": null,
  dateWatch: Date;
  // "dateWatch": null,
  idWish: number;
  // "idWish": 17

  constructor(wishesFromApi:any){

    // this.idCollection = wishesFromApi.idCollection;
    // this.idUser = wishesFromApi.idUser;
    
    this.idMovie = wishesFromApi.idMovie;
    // idMovie: number;
    // "idMovie": 631842,
    this.title = wishesFromApi.title;
    // title: string;
    // "title": "Knock at the Cabin",
    this.posterPath = wishesFromApi.posterPath;
    // posterPath: string;
    // "posterPath": "/ft72CljIa6FH9uQAEant5DqjINg.jpg",
    this.idWatch = wishesFromApi.idWatch;
    // idWatch: number;
    // "idWatch": null,
    this.viewingPlace = wishesFromApi.viewingPlace;
    // viewingPlace: string;
    // "viewingPlace": null,
    this.viewingRate = wishesFromApi.viewingRate;
    // viewingRate: number;
    // "viewingRate": null,
    this.viewingMood = wishesFromApi.viewingMood;
    // viewingMood: number;
    // "viewingMood": null,
    this.dateWatch = wishesFromApi.dateWish;
    // dateWatch: Date;
    // "dateWatch": null,
    this.idWish = wishesFromApi.idWish;
    // idWish: number;
    // "idWish": 17

  }
}
