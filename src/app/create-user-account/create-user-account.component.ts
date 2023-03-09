import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { CreateUserModel, CreateUserModelIam, UserModel } from '../shared/models/userlogin.model';

@Component({
  selector: 'app-create-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.css']
})
export class CreateUserAccountComponent {

  formInscription!:FormGroup;
  movieGenreRef: any;
  serieGenreRef:any;
  streamingSubsciptionRef:any;
  movieGenreCheckSelected: any;

  constructor(
    private fb:FormBuilder,
    public userService:UserService,
    private alertService:AlertService,
    private router:Router,
  ){}

  ngOnInit() {
    
    this.formInscription = this.fb.group ({
      pseudo: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(5)]],
      birthYear: ['', [Validators.required]],
      adultContent: [''],
      movieGenre: [''],
      serieGenre: [''],
      streamingSubs: [''],
      checkArrayMovie: this.fb.array([])
    });

    this.userService.getGenresMovie()
    .subscribe( (response:any) => {
        // console.log(response);
        this.movieGenreRef = response;
        // console.log(this.movieGenreRef[0]);
        // console.log(this.movieGenreRef[0].id);
        // console.log(this.movieGenreRef[0].name);
      }
    )

    this.userService.getGenresTv()
    .subscribe( (response:any) => {
        // console.log(response);
        this.serieGenreRef = response;
      }
    )

    this.userService.getStreaming()
    .subscribe( (response:any) => {
        // console.log(response);
        this.streamingSubsciptionRef = response;
      }
    )

  }

  onCheckboxChangeMovie(event:any) {
    const checkArray: FormArray = this.formInscription.get('checkArrayMovie') as FormArray;
    if (event.target.checked) {
      checkArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach(
        (item: any) => {
        if (item.value == event.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.movieGenreCheckSelected = checkArray.value 
    // console.log(this.movieGenreCheckSelected)
  }


  // async function getData (){

  //   const API_CREATE_USER_MMA = environment.base_url_apiBack+'/userAccount/create';
  //   const API_CREATE_USER_IAM = environment.base_url_apiBack+'/api/iam/createuser';

  //   const response1 = await fetch(API_CREATE_USER_IAM)
  //   const data1 = await response1.json()

  //   const response2 = await fetch(API_CREATE_USER_MMA)
  //   const data2 = await response1.json()
  // }

  createAccount() {
    // apiResponse.results.map( (movie: any) => new MovieModel(movie) )
    // let sendToApi:CreateUserModel = new CreateUserModel (

      // console.log("Pseudo : " + this.formInscription.controls['pseudo'].value)
      // console.log("Email : " + this.formInscription.controls['email'].value)
      // console.log("Année naissance : " + this.formInscription.controls['birthYear'].value)
      // console.log("Adult Content : " + this.formInscription.controls['adultContent'].value)
      // console.log(this.movieGenreCheckSelected)
    

      let userModelMma:CreateUserModel =
      {
        userName: this.formInscription.controls['pseudo'].value,
        email: this.formInscription.controls['email'].value,
        birthYear: Number(this.formInscription.controls['birthYear'].value),
        adultContent: this.formInscription.controls['adultContent'].value === "true",
        enableAccount: true,
        genreMovieDtoSet: [],
        genreTvDtoSet: [],
        streamingSubscriptionDtoSet: []
      }

      let userModelIam:CreateUserModelIam =
      {
        email: this.formInscription.controls['email'].value,
        password: this.formInscription.controls['password'].value,
        loginName: this.formInscription.controls['pseudo'].value
      }

      // console.log("==== SendToAPI ====")
      // console.log(userModelMma);


      this.userService.postCreateUserIamToApi(userModelIam)
      .subscribe({
        next: (responseIam:any) => {
          // console.log(responseIam);
          if(responseIam.status = "201") {
            console.log("User IAM - " + responseIam.pseudo + " - créé avec succès!");

            this.userService.postCreateUserToApi(userModelMma)
            .subscribe({
              next: (responseMma:any) => {
                if(responseIam.status = "201") {
                  console.log("User MMA créé avec succès!");
                }
                else {
                  console.log("Pb création user mma")
                }
              },
              error:error => console.log("Error create user mma: " + error)
              
            })

          } else {
            console.log("Pb création user iam");
          }
        },
        error: error => console.error("Error create user iam: " + error)
      });
  
  }

}
