import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  userData:any;

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
      this.router.navigate(['/list']);
      this.alertSvc.showAlert('Vous êtes déconnecté(e)');
    }
  }

}
