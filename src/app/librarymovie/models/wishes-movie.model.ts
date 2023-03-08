export class WishesMovie {

  idWish: number;
  dateWish: Date;
  idCollection: number;
  idMovie: number;
  idUser: number;

  constructor(wishesFromApi:any){

    this.idWish = wishesFromApi.idWish;
    this.dateWish = wishesFromApi.dateWish;
    this.idUser = wishesFromApi.idUser;
    this.idMovie = wishesFromApi.idMovie;
    this.idCollection = wishesFromApi.idCollection;

  }
}
