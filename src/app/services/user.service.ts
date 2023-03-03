import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertService } from './alert.service';
import { Router, RouterModule } from '@angular/router';
import { UserModel } from '../shared/models/userlogin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //API_USER:string = 'http://localhost:8081/login';
  API_USER = environment.url_apiUser;

  constructor(
    private http:HttpClient,
    private alertSvc:AlertService,
    private router:Router,
  ) { }

  login(credentials:UserModel) {
    let userData = {
      email : credentials.email, 
      passwordHash: credentials.password
    };
    return this.http.post(this.API_USER, userData);
  }

  logout() {
    localStorage.removeItem('token');
    this.alertSvc.showAlert('Vous êtes déconnecté(e)');
    // this.router.navigate(['/']);
  }

  isAuth():boolean {
    let token = localStorage.getItem('token')
    if(token!=null && token.length>100 ) {
      return true;
    }
    return false;
  }

}
