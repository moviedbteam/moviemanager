import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import {DiscoverComponent} from "./discover/discover.component";
import { DiscovermovieComponent } from './discovermovie/discovermovie.component';
import { DiscovertvComponent } from './discovertv/discovertv.component';
import { LibrarymovieComponent } from './librarymovie/librarymovie.component';
import { LibrarytvComponent } from './librarytv/librarytv.component';
import {ProfilComponent} from "./profil/profil.component";
import { RecommendationComponent } from './recommendation/recommendation.component';
import { DetailsheetmovieComponent } from './detailsheetmovie/detailsheetmovie.component';
import { DetailsheettvComponent } from './detailsheettv/detailsheettv.component';
import { SeeallmovieComponent } from './discovermovie/seeallmovie/seeallmovie.component';
import { SeealltvComponent } from './discovertv/seealltv/seealltv.component';
import { CreateUserAccountComponent } from './create-user-account/create-user-account.component';
import { DetailmovieComponent } from './librarymovie/detailmovie/detailmovie.component';

const routes: Routes = [
  {
    path:'', component:RecommendationComponent
  },
  {
    
    path:'discover', component:DiscoverComponent,
    children: [
      
      {
        path:'discovertv', component:DiscovertvComponent
      },
      {
        path:'discovermovie', component:DiscovermovieComponent
      },
    ],
  },
  {
    path:'connexion', component:ConnexionComponent
  },
  {
    path:'inscription', component:CreateUserAccountComponent
  },
  {
    path:'librarymovie', component:LibrarymovieComponent
  },
  {
    path:'librarytv', component:LibrarytvComponent
  },
  {
    path:'profil', component:ProfilComponent
  },
  {
    path:'seeallmovie', component:SeeallmovieComponent
  },
  {
    path:'seealltv', component:SeealltvComponent
  },
  {
    path:'moviedetail/:id', component:DetailmovieComponent
  },
  {
    path:'detailmovie/:id', component:DetailsheetmovieComponent
  },
  {
    path:'detailtv/:id', component:DetailsheettvComponent
  },
  {
    path:'**', component:RecommendationComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
