export interface UserModel {
    email: string;
    password: string;
}

export interface GenreMovieModel {
    id: number;
    name: string;
}
export interface GenreTvModel {
    id: number;
    name: string;
}
export interface StreamingModel {
    id: number;
    name: string;
}

export class CreateUserModel    {
    
    idUser: number;
    userName: string;
    email: string;
    birthYear: number;
    adultContent: boolean;
    enableAccount: boolean;
    genreMovieDtoSet: GenreMovieModel[] | any[];
    genreTvDtoSet: GenreTvModel[] | any[];
    streamingSubscriptionDtoSet: StreamingModel[] | any[];

    constructor(postCreateUserToApi:any) {
        this.idUser = postCreateUserToApi.idUser;
        this.userName = postCreateUserToApi.userName;
        this.email = postCreateUserToApi.email;
        this.birthYear = postCreateUserToApi.birthYear;
        this.adultContent = postCreateUserToApi.adultContent;
        this.enableAccount = postCreateUserToApi.enableAccount;
        this.genreMovieDtoSet = postCreateUserToApi.genreMovieDtoSet?postCreateUserToApi.genreMovieDtoSet:[];
        this.genreTvDtoSet = postCreateUserToApi.genreTvDtoSet?postCreateUserToApi.genreTvDtoSet:[];
        this.streamingSubscriptionDtoSet = postCreateUserToApi.streamingSubscriptionDtoSet?postCreateUserToApi.streamingSubscriptionDtoSet:[];

    }

}