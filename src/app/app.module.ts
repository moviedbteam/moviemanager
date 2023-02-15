import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnexionComponent } from './connexion/connexion.component';
import { BibliothequeComponent } from './bibliotheque/bibliotheque.component';
import { FicheComponent } from './fiche/fiche.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListComponent } from './list/list.component';
import { ActionbarComponent } from './actionbar/actionbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { DetailComponent } from './detail/detail.component';
import { PrintDurationPipe } from './shared/pipes/print-duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    BibliothequeComponent,
    FicheComponent,
    AjouterComponent,
    AccueilComponent,
    ListComponent,
    ActionbarComponent,
    SearchbarComponent,
    DetailComponent,
    PrintDurationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatSnackBarModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
