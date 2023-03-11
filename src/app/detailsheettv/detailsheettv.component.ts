import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TvService } from 'src/app/services/tv.service';
import { WatchService } from 'src/app/services/watch.service';
import { WishService } from 'src/app/services/wish.service';
import { TvModel } from '../discovertv/models/tv.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detailsheettv',
  templateUrl: './detailsheettv.component.html',
  styleUrls: ['./detailsheettv.component.css']
})
export class DetailsheettvComponent {

  tv:any = {};

  idEpisode:number = 0;
  idSeason:number = 0;
  // idUser:number = 0;
  idTv:number = 0;
  // idCollection:number = 0;
  viewingPlace:string = "";
  viewingRate:number = 0;
  viewingMood:number = 0;
  
  videoUrl!:SafeResourceUrl | null;

  tvs:Array<TvModel> =[];

  constructor(
      private route:ActivatedRoute,
      private router:Router,
      // private tvSvc:tvService,
      public tvSvc:TvService,
      private sanitize:DomSanitizer,
      private wishSvc:WishService,
      private watchSvc:WatchService,
      private _location:Location,
  ) {}

  ngOnInit() {

    console.log(this.route.snapshot.params);
    this.idTv = this.route.snapshot.params['id'];

    this.tvSvc.getDetailsFromApi(this.idTv);

    // this.tvSvc.gettvDetail$()
    // .subscribe(
    //   (tvs:tvModel[]) => {
    //     console.log("je suis la requete http de Detail Component");
    //     this.tv = tvs
    //   });

    this.tvSvc.getVideosFromApi(this.idTv)
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
    // this.router.navigate(['/']);
    this._location.back();
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


    // this.idEpisode = 1;
    // this.idSeason = 1;
    // this.idUser = 324827;
    // this.idCollection = 1313;
    this.idTv = this.route.snapshot.params['id'];
    let sendToApi = { 
      // idEpisode:this.idEpisode,
      // idSeason:this.idSeason,
      // idUser:this.idUser, 
      // idCollection:this.idCollection ,
      idTv:this.idTv
    };
    console.log(sendToApi);

    this.wishSvc.postWishTvToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {console.log(response.status)},
      error: error => console.error(error)
    });

  }

  checkWatch() {

    // this.idEpisode = 1;
    // this.idSeason = 1;
    // this.idUser = 324827;
    // this.idCollection = 1313;
    this.idTv = this.route.snapshot.params['id'];
    this.viewingPlace = "cinéma";
    this.viewingRate = 5;
    this.viewingMood = 1;
    let sendToApi = { 
      idEpisode:this.idEpisode,
      idSeason:this.idSeason,
      // idUser:this.idUser, 
      // idCollection:this.idCollection, 
      idTv:this.idTv, 
      viewingPlace:this.viewingPlace, 
      viewingRate:this.viewingRate, 
      viewingMood:this.viewingMood
    };
    console.log(sendToApi);

    this.watchSvc.postWatchTvToApi(sendToApi)
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
