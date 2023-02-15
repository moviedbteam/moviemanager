import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  connexion!:FormGroup;
  isSubmitted:boolean = false;
  userData:any;

  constructor(
    private fb:FormBuilder,
    public userSvc:UserService,
    private alertSvc:AlertService,
    private router:Router
  ){}

  ngOnInit() {
    
    this.connexion = this.fb.group ({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(5)]],
    });

    let userDataInStorage = localStorage.getItem('userData');
    this.userData = userDataInStorage!=null?JSON.parse(userDataInStorage):{};
  }

  onSubmit() {

    if(this.connexion.valid) {

      this.userSvc.login(this.connexion.value)
      .subscribe(
        {
          next: (response:any) => {
            console.log(response);
            
            let userData = {
              id: response.user.id,
              token: response.jwt,
              email: response.user.email,
              username: response.user.username,
            };
            localStorage.setItem('token', response.jwt);
            localStorage.setItem('userData', JSON.stringify(userData));


            if(response.jwt){  
              this.router.navigate(['/']);
              this.alertSvc.showAlert('Vous êtes connecté(e)');
            }
          },
          error: (err) => console.log('mon erreur'+err)
        }
      
      )
    } 
  }

  logoutAction() {
    this.userSvc.logout()
  }

}
