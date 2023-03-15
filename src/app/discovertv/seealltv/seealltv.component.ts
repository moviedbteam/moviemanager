import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { TvService } from 'src/app/services/tv.service';
import { TvModel } from '../models/tv.model';

@Component({
  selector: 'app-seealltv',
  templateUrl: './seealltv.component.html',
  styleUrls: ['./seealltv.component.css']
})
export class SeealltvComponent {

  tvs:Array<TvModel> =[];
  subscription:any;

  constructor(
    private tvSvc:TvService, 
    private alerteService:AlertService) {
    console.log(this);
  }

  ngOnInit() {
    this.subscription = this.tvSvc.getTvs$()
      .subscribe(
        (tvsArr:TvModel[]) => {
          if(tvsArr.length===0) {
            this.tvSvc.getTvsFromApi();
          }
          this.tvs = tvsArr
        });
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  callTest(str:string) {
    this.alerteService.showAlert("Ajouté aux " + str + "!!!");
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}