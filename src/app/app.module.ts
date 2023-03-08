import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnexionComponent } from './connexion/connexion.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PrintDurationPipe } from './shared/pipes/print-duration.pipe';
import { DiscoverComponent } from './discover/discover.component';
import { ProfilComponent } from './profil/profil.component';
import { MaterialExampleModule } from 'src/material.module';
import { ConnexmodalComponent } from './connexmodal/connexmodal.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { DiscovertvComponent } from './discovertv/discovertv.component';
import { DiscovermovieComponent } from './discovermovie/discovermovie.component';
import { ActionbarmovieComponent } from './actionbarmovie/actionbarmovie.component';
import { ActionbartvComponent } from './actionbartv/actionbartv.component';
import { SearchbartvComponent } from './searchbartv/searchbartv.component';
import { SearchbarmovieComponent } from './searchbarmovie/searchbarmovie.component';
import { DetailsheetmovieComponent } from './shared/comps/detailsheetmovie/detailsheetmovie.component';
import { DetailsheettvComponent } from './shared/comps/detailsheettv/detailsheettv.component';
import { SeeallmovieComponent } from './shared/comps/seeallmovie/seeallmovie.component';
import { SeealltvComponent } from './shared/comps/seealltv/seealltv.component';
import { OverviewWatchMovieComponent } from './shared/comps/overview-watch-movie/overview-watch-movie.component';
import { OverviewWatchTvComponent } from './shared/comps/overview-watch-tv/overview-watch-tv.component';
import { OverviewWishTvComponent } from './shared/comps/overview-wish-tv/overview-wish-tv.component';
import { OverviewWishMovieComponent } from './shared/comps/overview-wish-movie/overview-wish-movie.component';
import { LibrarymovieComponent } from './librarymovie/librarymovie.component';
import { LibrarytvComponent } from './librarytv/librarytv.component';
import { OverviewRecoMovieComponent } from './shared/comps/overview-reco-movie/overview-reco-movie.component';
import { OverviewRecoTvComponent } from './shared/comps/overview-reco-tv/overview-reco-tv.component';
import { StatisticComponent } from './statistic/statistic.component';
import { PreferenceComponent } from './preference/preference.component';
import { RecommendationComponent } from './recommendation/recommendation.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    ActionbarmovieComponent,
    ActionbartvComponent,
    SearchbarmovieComponent,
    SearchbartvComponent,
    PrintDurationPipe,
    DiscoverComponent,
    LibrarymovieComponent,
    LibrarytvComponent,
    SeeallmovieComponent,
    SeealltvComponent,
    DetailsheetmovieComponent,
    DetailsheettvComponent,
    ProfilComponent,
    OverviewWatchMovieComponent,
    OverviewWatchTvComponent,
    OverviewWishMovieComponent,
    OverviewWishTvComponent,
    ConnexmodalComponent,
    DiscovertvComponent,
    DiscovermovieComponent,
    ActionbarmovieComponent,
    ActionbartvComponent,
    SearchbartvComponent,
    SearchbarmovieComponent,
    DetailsheetmovieComponent,
    DetailsheettvComponent,
    SeeallmovieComponent,
    SeealltvComponent,
    OverviewWatchMovieComponent,
    OverviewWatchTvComponent,
    OverviewWishTvComponent,
    OverviewWishMovieComponent,
    LibrarymovieComponent,
    LibrarytvComponent,
    OverviewRecoMovieComponent,
    OverviewRecoTvComponent,
    StatisticComponent,
    PreferenceComponent,
    RecommendationComponent,
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
