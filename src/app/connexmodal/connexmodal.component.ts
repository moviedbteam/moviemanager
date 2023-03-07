import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../connexion/connexion.component'; 
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connexmodal',
  templateUrl: './connexmodal.component.html',
  styleUrls: ['./connexmodal.component.css']
})
export class ConnexmodalComponent {
  choiceAdultContent = ['Yes', 'No'];
  choiceEnableAccount = ['Yes', 'No'];

  // toppingsGenreMovie = ['Suspens', 'Drame', 'Animation'];
  toppingsGenreMovie = [''];
  // orderGenreMovie: readonly string[] = [];
  // toppingsGenreTv = ['Saga', 'Survivalist', 'Sport', 'Planet'];
  toppingsGenreTv = [''];
  // orderGenreTv: readonly string[] = [];
  // toppingsStreaming = ['Free', 'Molotov', 'Canal+', 'Netflix', 'PrimeVideo', 'Appletv+', 'MYTF1'];
  toppingsStreaming = [''];
  // orderStreaming: readonly string[] = [];
  constructor(
    public userSvc:UserService,
    public dialogRef: MatDialogRef<ConnexmodalComponent>,

    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit() {
    this.userSvc.getGenresMovie ()
      .subscribe( (response:any) => {
        console.log(response);
        // this.toppingsGenreMovie = [...this.toppingsGenreMovie, ...response];
        for (let item of response) {
          this.toppingsGenreMovie.push(item.name);
        }
      });
    this.userSvc.getGenresTv ()
      .subscribe( (response:any) => {
        console.log(response);
        // this.toppingsGenreTv = [...this.toppingsGenreTv, ...response];
        for (let item of response) {
          this.toppingsGenreTv.push(item.name);
        }
      });
    this.userSvc.getStreaming ()
      .subscribe( (response:any) => {
        console.log(response);
        // this.toppingsStreaming = [...this.toppingsStreaming, ...response];
        for (let item of response) {
          this.toppingsStreaming.push(item.name);
        }
      });
  }

  resetAdultContent() {
    this.data.adultContent = ['No'];
  }

  resetEnableAccount() {
    this.data.enableAccount = ['Yes'];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
