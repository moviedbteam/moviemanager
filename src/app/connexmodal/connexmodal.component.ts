import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../connexion/connexion.component'; 

@Component({
  selector: 'app-connexmodal',
  templateUrl: './connexmodal.component.html',
  styleUrls: ['./connexmodal.component.css']
})
export class ConnexmodalComponent {
  choiceAdultContent = ['Yes', 'No'];
  choiceEnableAccount = ['Yes', 'No'];

  toppingsGenreMovie = ['Suspens', 'Drame', 'Animation'];
  // orderGenreMovie: readonly string[] = [];
  toppingsGenreTv = ['Saga', 'Survivalist', 'Sport', 'Planet'];
  // orderGenreTv: readonly string[] = [];
  toppingsStreaming = ['Free', 'Molotov', 'Canal+', 'Netflix', 'PrimeVideo', 'Appletv+', 'MYTF1'];
  // orderStreaming: readonly string[] = [];
  constructor(
    public dialogRef: MatDialogRef<ConnexmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

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
