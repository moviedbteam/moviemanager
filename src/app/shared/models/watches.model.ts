export class WatchesModel {

  uid: string;
  idUser: number;
  idMovie: number;
  idCollection: number;
  viewingPlace: string;
  viewingRate: number;
  viewingMood: number;

  constructor(watchesFromApi:any){

    this.uid = watchesFromApi.uid;
    this.idUser = watchesFromApi.idUser;
    this.idMovie = watchesFromApi.idMovie;
    this.idCollection = watchesFromApi.idCollection;
    this.viewingPlace = watchesFromApi.viewingPlace;
    this.viewingRate = watchesFromApi.viewingRate;
    this.viewingMood = watchesFromApi.viewingMood;

  }


}
