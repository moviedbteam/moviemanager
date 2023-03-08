export class WatchesMovie {

  idWatch: number;
  viewingPlace: string;
  viewingRate: number;
  viewingMood: number;
  idMovie: number;
  idCollection: number;
  dateWatch: Date;

  constructor(watchesFromApi:any){

    this.idWatch = watchesFromApi.idWatch;
    this.viewingPlace = watchesFromApi.viewingPlace;
    this.viewingRate = watchesFromApi.viewingRate;
    this.viewingMood = watchesFromApi.viewingMood;
    this.idMovie = watchesFromApi.idMovie;
    this.idCollection = watchesFromApi.idCollection;
    this.dateWatch = watchesFromApi.dateWatch;
    
  }


}