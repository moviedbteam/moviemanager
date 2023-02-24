export class WishesModel {

  uid: string;
  idUser: number;
  idMovie: number;
  idCollection: number;

  constructor(wishesFromApi:any){

    this.uid = wishesFromApi.uid;
    this.idUser = wishesFromApi.idUser;
    this.idMovie = wishesFromApi.idMovie;
    this.idCollection = wishesFromApi.idCollection;

  }
}
