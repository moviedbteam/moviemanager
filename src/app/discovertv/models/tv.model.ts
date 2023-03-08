interface Genre {
    id:number;
    name:string;
}

export class TvModel {
    id: number;
    titre: string;
    resume: string;
    image_portrait: string;
    image_landscape: string;
    score: number;
    date: Date;
    duration: number;
    genres: Genre[] | any[];

    constructor(tvFromApi:any) {
        this.id = tvFromApi.id;
        this.titre = tvFromApi.name;
        this.resume = tvFromApi.overview;
        this.image_portrait = tvFromApi.poster_path;
        this.image_landscape = tvFromApi.backdrop_path;
        this.score = tvFromApi.vote_average;
        this.date = tvFromApi.release_date;
        this.duration = tvFromApi.runtime? tvFromApi.runtime : 0;
        this.genres = tvFromApi.genres?tvFromApi.genres:[];
    }
}

