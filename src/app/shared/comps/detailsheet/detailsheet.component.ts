import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import { TagService } from 'src/app/services/tag.service';
import {MovieService} from "../../../services/movie.service";
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-detailsheet',
  templateUrl: './detailsheet.component.html',
  styleUrls: ['./detailsheet.component.css']
})
export class DetailsheetComponent {

  movie:any = {};

  userId:string = "";
  movieId:number = 0;
  collectionId:number = 0;
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
      private tagSvc:TagService
  ) {}

  ngOnInit() {

    console.log(this.route.snapshot.params);
    this.movieId = this.route.snapshot.params['id'];

    this.movieSvc.getDetailsFromApi(this.movieId);

    // this.movieSvc.getMovieDetail$()
    // .subscribe(
    //   (movies:MovieModel[]) => {
    //     console.log("je suis la requete http de Detail Component");
    //     this.movie = movies
    //   });

    this.movieSvc.getVideosFromApi(this.movieId)
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

    this.userId = "324827";
    this.movieId = this.route.snapshot.params['id'];
    this.collectionId = 1313;

    // let sendToApi = JSON.stringify({ "idUser":"324827", "idMovie":11, "idCollection":1313 });
    let sendToApi = { idUser:"324827", idMovie:11, idCollection:1313 };


    console.log(sendToApi);

    this.tagSvc.postWishToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {console.log(response.status)},
      error: error => console.error(error)
    });


  }

  checkWatch() {

    this.userId = "324827";
    this.movieId = this.route.snapshot.params['id'];
    this.collectionId = 1313;

    
    console.log(this.movieSvc.getMovieDetail$);

    this.movieSvc.getMovieDetail$()
    .subscribe(
      (movies) => {
        console.log("je suis la requete http de Detail Component");
        this.movie = movies;
        console.log(this.movie);
      });

    this.viewingPlace = "cinéma";
    this.viewingRate = 5;
    this.viewingMood = 1;

  }

}
