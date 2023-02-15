import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../shared/models/movie.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  movie:any = {};
  movieId:number = 0;
  videoUrl!:SafeResourceUrl | null;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private movieSvc:MovieService,
    private sanitize:DomSanitizer
    ) {}

  ngOnInit() {

    console.log(this.route.snapshot.params);
    this.movieId = this.route.snapshot.params['id'];
      
    this.movieSvc.getDetailsFromApi(this.movieId);
    
    this.movieSvc.getMovieDetail$()
    .subscribe(
      (movies:MovieModel[]) => this.movie = movies
    );
    
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

}
