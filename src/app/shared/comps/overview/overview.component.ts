import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  wishMoviesINIT = Array.from({length: 100}).map((_, i) => `Wish Movie #${i}`);
  wishMovies:any;

  watchMoviesINIT = Array.from({length: 100}).map((_, i) => `Watch Movie #${i}`);
  watchMovies:any ;

  jsonWishMovies: any;
  jsonWatchMovies: any;

  ApiGetAllWishMovies:string = 'http://localhost:8080/api/wish/movies';
  ApiGetAllWatchMovies:string = 'http://localhost:8080/api/watch/movies';

  constructor(
    
    private tagSvc:TagService
  ) {}

  ngOnInit() {
    this.viewWishes();  
    this.viewWatches();

    // this.wishMovies = JSON.parse (this.jsonWishMovies);
    // this.watchMovies = JSON.parse (this.jsonWatchMovies);

    console.log(this.wishMoviesINIT);
    console.log(this.watchMoviesINIT);

    console.log(this.wishMovies);
    console.log(this.watchMovies);




  }



  viewWishes() {  
    fetch(this.ApiGetAllWishMovies)
    .then(response => response.json())
    .then(data => {
      const tableau = [];
      for (let i = 0; i < data.length; i++) {
        tableau.push(("data[i].idMovie"));
      }
      // console.log(tableau); // affiche le tableau complet
      this.wishMovies = [...tableau];
      // console.log(this.wishMovies); // affiche le tableau complet
    })
    .catch(error => console.error(error));


    
    /*
    this.tagSvc.getAllWishMoviesFromApi()
    .subscribe({
      next: (response:any)=>  {
        this.jsonWishMovies = response;
        console.log(this.jsonWishMovies);
      },
      error: error => console.error(error)
    });

    // for (let i = 0; i < this.jsonWishMovies.length; i++) {
    //   this.wishMovies.push(this.jsonWishMovies[i]);
    // }
    console.log(this.wishMovies);
    */

  }

  viewWatches() {  
    fetch(this.ApiGetAllWatchMovies)
    .then(response => response.json())
    .then(data => {
      const tableau = [];
      for (let i = 0; i < data.length; i++) {
        tableau.push(data[i]);
      }
      // console.log(tableau); // affiche le tableau complet
      this.watchMovies = [...tableau];
      // console.log(this.watchMovies); // affiche le tableau complet
    })
    .catch(error => console.error(error));


    /*

    this.tagSvc.getAllWatchMoviesFromApi()
    .subscribe({
      next: (response:any)=>  {
        this.jsonWatchMovies = response;
        console.log(this.jsonWatchMovies);
        // fetch(response)
        // .then(respons => respons.json())
        // .then(data => {
        //   const tableau = [];
        //   for (let i = 0; i < data.length; i++) {
        //     tableau.push(data[i]);
        //   }
        //   console.log(tableau); 
        //   this.wishMovies = [...tableau];
        // })
      },
      error: error => console.error(error)
    });
    */

    

    
    
    

  }




}


