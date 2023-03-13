export class WatchesMovie {

  // idCollection: number;
  
  // idCollection: number;
  // idUser: number;
  
  idMovie: number;
  // idMovie: number;
  // "idMovie": 631842,
  title: string;
  // "title": "Knock at the Cabin",
  posterPath: string;
  // "posterPath": "/ft72CljIa6FH9uQAEant5DqjINg.jpg",
  idWatch: number;
  // idWatch: number;
  // "idWatch": null,
  viewingPlace: string;
  // viewingPlace: string;
  // "viewingPlace": null,
  viewingRate: number;
  // viewingRate: number;
  // "viewingRate": null,
  viewingMood: number;
  // viewingMood: number;
  // "viewingMood": null,
  dateWatch: Date;
  // dateWatch: Date;
  // "dateWatch": null,
  idWish: number;
  // "idWish": 17

  constructor(watchesFromApi:any){

    // this.idCollection = watchesFromApi.idCollection;
    
    
    // this.idCollection = wishesFromApi.idCollection;
    // this.idUser = wishesFromApi.idUser;
    
    this.idMovie = watchesFromApi.idMovie;
    // this.idMovie = wishesFromApi.idMovie;
    // idMovie: number;
    // "idMovie": 631842,
    this.title = watchesFromApi.title;
    // title: string;
    // "title": "Knock at the Cabin",
    this.posterPath = watchesFromApi.posterPath;
    // posterPath: string;
    // "posterPath": "/ft72CljIa6FH9uQAEant5DqjINg.jpg",
    this.idWatch = watchesFromApi.idWatch;
    // this.idWatch = wishesFromApi.idWatch;
    // idWatch: number;
    // "idWatch": null,
    this.viewingPlace = watchesFromApi.viewingPlace;
    // this.viewingPlace = wishesFromApi.viewingPlace;
    // viewingPlace: string;
    // "viewingPlace": null,
    this.viewingRate = watchesFromApi.viewingRate;
    // this.viewingRate = wishesFromApi.viewingRate;
    // viewingRate: number;
    // "viewingRate": null,
    this.viewingMood = watchesFromApi.viewingMood;
    // this.viewingMood = wishesFromApi.viewingMood;
    // viewingMood: number;
    // "viewingMood": null,
    this.dateWatch = watchesFromApi.dateWatch;
    // this.dateWatch = wishesFromApi.dateWish;
    // dateWatch: Date;
    // "dateWatch": null,
    this.idWish = watchesFromApi.idWish;
    // idWish: number;
    // "idWish": 17
    
  }


}
