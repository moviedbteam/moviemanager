import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConnexmodalComponent } from '../connexmodal/connexmodal.component';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { CreateUserModel } from '../shared/models/userlogin.model';

export interface DialogData {

  name: string;
  email: string;
  password: string;
  birthYear: number;
  adultContent: any;
  enableAccount: any;
  genreMovieDtoSet: [];
  genreTvDtoSet: [];
  streamingSubscriptionDtoSet: [];

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
    birthYear: 0,
    adultContent: [],
    enableAccount: [],
    genreMovieDtoSet: [],
    genreTvDtoSet: [],
    streamingSubscriptionDtoSet: []
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
        genreMovieDtoSet: this.myData.genreMovieDtoSet,
        genreTvDtoSet: this.myData.genreTvDtoSet,
        streamingSubscriptionDtoSet: this.myData.streamingSubscriptionDtoSet,
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
      this.myData.genreMovieDtoSet = result.genreMovieDtoSet;
      this.myData.genreTvDtoSet = result.genreTvDtoSet;
      this.myData.streamingSubscriptionDtoSet = result.streamingSubscriptionDtoSet;
    });
  }

  createAccount() {
    // apiResponse.results.map( (movie: any) => new MovieModel(movie) )
    // let sendToApi:CreateUserModel = new CreateUserModel (

      let sendToApi:CreateUserModel =
    {
      //     idUser: 1234,
      userName: this.myData.name,
      email: this.myData.email,
      birthYear: this.myData.birthYear,
      adultContent: this.myData.adultContent,
      // adultContent: false,
      // enableAccount: this.myData.enableAccount,
      enableAccount: true,
      genreMovieDtoSet: this.myData.genreMovieDtoSet,
      // genreMovieDtoSet: [
      //   {id: 35,name: "Comédie"},
      //   {id: 16,name: "Animation"},
      //   {id: 10751,name: "Familial"}
      // ],
      // genreTvDtoSet: this.myData.genreTvDtoSet,
      genreTvDtoSet: [
        {id: 16,name: "Animation"}
      ],
      // streamingSubscriptionDtoSet: this.myData.streamingSubscriptionDtoSet,
      streamingSubscriptionDtoSet: [
        {id: 20,name: "ABS-CBN"},
        {id: 87,name: "Fox Sports Detroit"},
        {id: 47,name: "Comedy Central"}
      ]
  }
  // ); 

    console.log(sendToApi);

    this.userSvc.postCreateUserToApi(sendToApi)
    .subscribe({
      next: (response:any) => {
        console.log(response)
        if(response.status = "201") {
          
        }
      },
      error: error => console.error(error)
    });
  
  }

  onSubmit() {

    if(this.connexion.valid) {

      this.userSvc.login(this.connexion.value)
      .subscribe(
        {
          next: (response:any) => {
            console.log(response);
            
            // let userData = {
            //   id: response.user.id,
            //   token: response.jwt,
            //   email: response.user.email,
            //   username: response.user.username,
            // };

            localStorage.setItem('token', response.jwt);
            // localStorage.setItem('userData', JSON.stringify(userData));


            if(response.jwt){  
              // this.router.navigate(['/']);
              this.alertSvc.showAlert('Vous êtes connecté(e)');
            }
          },
          // error: (err) => console.log('mon erreur'+err)
          error: (err) => console.log(err)
        }
      
      )
    } 
  }

  logoutAction() {
    this.userSvc.logout()
  }

}
