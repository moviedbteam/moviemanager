import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConnexmodalComponent } from '../connexmodal/connexmodal.component';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

export interface DialogData {

  name: string;
  email: string;
  password: string;
  birthYear: string;
  adultContent: any;
  enableAccount: any;
  genreMovie: [];
  genreTv: [];
  streaming: [];


}

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  
  myData: DialogData = {

    name: '',
    email: '',
    password: '',
    birthYear: '',
    adultContent: [],
    enableAccount: [],
    genreMovie: [],
    genreTv: [],
    streaming: []
  };
  connexion!:FormGroup;
  isSubmitted:boolean = false;
  userData:any;

  constructor(
    private fb:FormBuilder,
    public userSvc:UserService,
    private alertSvc:AlertService,
    private router:Router,
    public dialog: MatDialog,
  ){}

  ngOnInit() {
    
    this.connexion = this.fb.group ({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(5)]],
    });

    let userDataInStorage = localStorage.getItem('userData');
    this.userData = userDataInStorage!=null?JSON.parse(userDataInStorage):{};
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConnexmodalComponent, {
      data: {
        name: this.myData.name,
        email: this.myData.email,
        password: this.myData.password,
        birthYear: this.myData.birthYear,
        adultContent: this.myData.adultContent,
        enableAccount: this.myData.enableAccount,
        genreMovie: this.myData.genreMovie,
        genreTv: this.myData.genreTv,
        streaming: this.myData.streaming,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.myData.name = result.name;
      this.myData.email = result.email;
      this.myData.password = result.password;
      this.myData.birthYear = result.birthYear;
      this.myData.adultContent = result.adultContent;
      this.myData.enableAccount = result.enableAccount;
      this.myData.genreMovie = result.genreMovie;
      this.myData.genreTv = result.genreTv;
      this.myData.streaming = result.streaming;
    });
  }

  createAccount() {
    
  }

  onSubmit() {

    if(this.connexion.valid) {

      this.userSvc.login(this.connexion.value)
      .subscribe(
        {
          next: (response:any) => {
            console.log(response);
            
            let userData = {
              // id: response.id,
              token: response.jwt,
              email: response.email,
              // username: response.username,
            };
            localStorage.setItem('token', response.jwt);
            console.log(response.jwt);
            localStorage.setItem('userData', JSON.stringify(userData));


            if(response.jwt){  
              // this.router.navigate(['/']);
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
