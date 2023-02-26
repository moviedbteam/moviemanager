import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnexionComponent } from './connexion/connexion.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActionbarComponent } from './actionbar/actionbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { PrintDurationPipe } from './shared/pipes/print-duration.pipe';
import { OverviewComponent } from './shared/comps/overview/overview.component';
import { DiscoverComponent } from './discover/discover.component';
import { LibraryComponent } from './library/library.component';
import { SeeallComponent } from './shared/comps/seeall/seeall.component';
import { DetailsheetComponent } from './shared/comps/detailsheet/detailsheet.component';
import { ProfilComponent } from './profil/profil.component';
import { MaterialExampleModule } from 'src/material.module';
import { OverviewWatchComponent } from './shared/comps/overview-watch/overview-watch.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    ActionbarComponent,
    SearchbarComponent,
    PrintDurationPipe,
    OverviewComponent,
    DiscoverComponent,
    LibraryComponent,
    SeeallComponent,
    DetailsheetComponent,
    ProfilComponent,
    OverviewWatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatSnackBarModule,

    MaterialExampleModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
