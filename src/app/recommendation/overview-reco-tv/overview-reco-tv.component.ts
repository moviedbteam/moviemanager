import { Component } from '@angular/core';
import { RecoTv } from '../models/reco-tv.model';
import { RecoTvService } from '../services/reco-tv.service';

@Component({
  selector: 'app-overview-reco-tv',
  templateUrl: './overview-reco-tv.component.html',
  styleUrls: ['./overview-reco-tv.component.css']
})
export class OverviewRecoTvComponent {

  recoTvs:Array<RecoTv> = [];
  subscriptionRecoTv:any;

  constructor(
    private recoTvSvc:RecoTvService,
  ){}

  ngOnInit() {
    
    this.subscriptionRecoTv = this.recoTvSvc.getRecoTv$()
    .subscribe(
      (recoArr:RecoTv[]) => {        
        if(recoArr.length===0) {
          this.recoTvSvc.getRecoTvFromApi();
        }
        this.recoTvs = recoArr
        console.log(this.recoTvs);
        }
    );
  }
            
  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }
  
  ngOnDestroy() {
    this.subscriptionRecoTv.unsubscribe();
  }

}
