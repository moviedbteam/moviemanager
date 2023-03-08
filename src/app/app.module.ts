import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RecommendationComponent } from './recommendation/recommendation.component';
import { OverviewRecoTvComponent } from './recommendation/overview-reco-tv/overview-reco-tv.component';
import { OverviewRecoMovieComponent } from './recommendation/overview-reco-movie/overview-reco-movie.component';

import { DiscoverComponent } from './discover/discover.component';

import { DiscovermovieComponent } from './discovermovie/discovermovie.component';
import { ActionbarmovieComponent } from './discovermovie/actionbarmovie/actionbarmovie.component';
import { SearchbarmovieComponent } from './discovermovie/searchbarmovie/searchbarmovie.component';
import { SeeallmovieComponent } from './discovermovie/seeallmovie/seeallmovie.component';

import { DiscovertvComponent } from './discovertv/discovertv.component';
import { ActionbartvComponent } from './discovertv/actionbartv/actionbartv.component';
import { SearchbartvComponent } from './discovertv/searchbartv/searchbartv.component';
import { SeealltvComponent } from './discovertv/seealltv/seealltv.component';

import { LibrarytvComponent } from './librarytv/librarytv.component';
import { OverviewWatchTvComponent } from './librarytv/overview-watch-tv/overview-watch-tv.component';
import { OverviewWishTvComponent } from './librarytv/overview-wish-tv/overview-wish-tv.component';

import { LibrarymovieComponent } from './librarymovie/librarymovie.component';
import { OverviewWatchMovieComponent } from './librarymovie/overview-watch-movie/overview-watch-movie.component';
import { OverviewWishMovieComponent } from './librarymovie/overview-wish-movie/overview-wish-movie.component';

import { ProfilComponent } from './profil/profil.component';
import { StatisticComponent } from './profil/statistic/statistic.component';
import { PreferenceComponent } from './profil/preference/preference.component';

import { ConnexionComponent } from './connexion/connexion.component';
import { ConnexmodalComponent } from './connexmodal/connexmodal.component';

import { DetailsheetmovieComponent } from './detailsheetmovie/detailsheetmovie.component';
import { DetailsheettvComponent } from './detailsheettv/detailsheettv.component';
import { PrintDurationPipe } from './shared/pipes/print-duration.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialExampleModule } from 'src/material.module';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,

    RecommendationComponent,
    OverviewRecoMovieComponent,
    OverviewRecoTvComponent,

    DiscoverComponent,

    DiscovermovieComponent,
    ActionbarmovieComponent,
    SearchbarmovieComponent,
    SeeallmovieComponent,

    DiscovertvComponent,
    ActionbartvComponent,
    SearchbartvComponent,
    SeealltvComponent,

    LibrarytvComponent,
    OverviewWatchTvComponent,
    OverviewWishTvComponent,

    LibrarymovieComponent,
    OverviewWatchMovieComponent,
    OverviewWishMovieComponent,

    ProfilComponent,
    PreferenceComponent,
    StatisticComponent,

    ConnexionComponent,
    ConnexmodalComponent,

    DetailsheetmovieComponent,
    DetailsheettvComponent,
    PrintDurationPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatSnackBarModule,

    MaterialExampleModule,
    FormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
