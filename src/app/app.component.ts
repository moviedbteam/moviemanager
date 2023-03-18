import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'moviemanager';
  userData:any;
  isAuth = this.userService.isAuth();
  _cssLoginIcon: string =""
  _cssLoginIconOn: string = "fa-solid fa-user"
  _cssLoginIconOff: string = "fa-regular fa-user"

  constructor (
    public userService: UserService,
    private router:Router,
  ){}

  ngOnInit() {

      let userDataInStorage = localStorage.getItem('userData');
      this.userData = userDataInStorage!=null?JSON.parse(userDataInStorage):{};

      if (this.isAuth) this._cssLoginIcon = this._cssLoginIconOn;
      else  this._cssLoginIcon = this._cssLoginIconOff;
    
  }

  
}
