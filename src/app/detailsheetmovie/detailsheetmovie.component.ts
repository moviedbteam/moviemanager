import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { WatchService } from 'src/app/services/watch.service';
import { WishService } from 'src/app/services/wish.service';
import { MovieModel } from '../discovermovie/models/movie.model';

@Component({
  selector: 'app-detailsheetmovie',
  templateUrl: './detailsheetmovie.component.html',
  styleUrls: ['./detailsheetmovie.component.css']
})
export class DetailsheetmovieComponent {

  movie:any = {};

  idUser:number = 0;
  idMovie:number = 0;
  idCollection:number = 0;
  viewingPlace:string = "";
  viewingRate:number = 0;
  viewingMood:number = 0;
  
  videoUrl!:SafeResourceUrl | null;

  movies:Array<MovieModel> =[];

  constructor(
      private route:ActivatedRoute,
      private router:Router,
      // private movieSvc:MovieService,
      public movieSvc:MovieService,
      private sanitize:DomSanitizer,
      private wishSvc:WishService,
      private watchSvc:WatchService,
  ) {}

  ngOnInit() {

    console.log(this.route.snapshot.params);
    this.idMovie = this.route.snapshot.params['id'];

    this.movieSvc.getDetailsFromApi(this.idMovie);

    // this.movieSvc.getMovieDetail$()
    // .subscribe(
    //   (movies:MovieModel[]) => {
    //     console.log("je suis la requete http de Detail Component");
    //     this.movie = movies
    //   });

    this.movieSvc.getVideosFromApi(this.idMovie)
          .subscribe( (response:any) => {
          console.log(response);
          if(response.results.length>0){
            let videoId = response.results[0].key;
            this.videoUrl=this.sanitize.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoId+'?showinfo=0');
          }
          else {
            this.videoUrl = null
          }
        })
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return "https://image.tmdb.org/t/p/w300"+urlFragment;
  }

  
  // onSubmitCommentForm(){
  //   console.log(this.commentForm.value)
  //   if(this.commentForm.valid) {
  //     this.userSvc.postCommentToApi(this.commentForm.value)
  //     .subscribe({
  //         next: (response:any)=>  {console.log(response.status)},
  //         error: error => console.error(error)
          
  //   })
  //   }
  // }
  
  addWish() {

    this.idUser = 324827;
    this.idMovie = this.route.snapshot.params['id'];
    this.idCollection = 1313;
    let sendToApi = { 
      idUser:this.idUser, 
      idMovie:this.idMovie, 
      idCollection:this.idCollection 
    };
    console.log(sendToApi);

    this.wishSvc.postWishMovieToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {console.log(response.status)},
      error: error => console.error(error)
    });

  }

  checkWatch() {

    this.idUser = 324827;
    this.idMovie = this.route.snapshot.params['id'];
    this.idCollection = 1313;
    this.viewingPlace = "cinéma";
    this.viewingRate = 5;
    this.viewingMood = 1;
    let sendToApi = { 
      idUser:this.idUser, 
      idMovie:this.idMovie, 
      idCollection:this.idCollection, 
      viewingPlace:this.viewingPlace, 
      viewingRate:this.viewingRate, 
      viewingMood:this.viewingMood
    };
    console.log(sendToApi);

    this.watchSvc.postWatchMovieToApi(sendToApi)
    .subscribe({
      next: (response:any) => {
        console.log(response)
        if(response.status = "201") {
          
        }
      },
      error: error => console.error(error)
    });

  }

}
