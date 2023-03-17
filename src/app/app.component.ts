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
  _cssLoginIconOn: string = "fa-solid fa-user"
  _cssLoginIconOff: string = "fa-regular fa-user"

  constructor (
    private userSvc:UserService,
    private router:Router,
  ){}

  ngOnInit() {
   
  
    console.log (this.userSvc.isAuth())

    // if (this.userSvc.isAuth()){


      
      let userDataInStorage = localStorage.getItem('userData');
      this.userData = userDataInStorage!=null?JSON.parse(userDataInStorage):{};
      
    // // } else {
    //   this.router.navigate(['/connexion']);
    // }
    

  }

  
}
