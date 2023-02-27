import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {

  constructor(
      public userSvc:UserService,
      private router:Router,
      private alertSvc:AlertService,
  ){}

  ngOnInit() {

    if(this.userSvc.isAuth()){
      this.router.navigate(['/']);
      this.alertSvc.showAlert('Vous êtes connecté(e)');
    }else{
      this.router.navigate(['/']);
      this.alertSvc.showAlert('Vous êtes déconnecté(e)');
    }
  }

}
