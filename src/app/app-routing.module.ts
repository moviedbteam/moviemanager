import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import {DiscoverComponent} from "./discover/discover.component";
import {LibraryComponent} from "./library/library.component";
import {DetailsheetComponent} from "./shared/comps/detailsheet/detailsheet.component";
import {SeeallComponent} from "./shared/comps/seeall/seeall.component";
import {ProfilComponent} from "./profil/profil.component";
import { OverviewComponent } from './shared/comps/overview/overview.component';

const routes: Routes = [
  {
    path:'', component:DiscoverComponent
  },
  {
    path:'connexion', component:ConnexionComponent
  },
  {
    path:'library', component:LibraryComponent
  },
  {
    path:'profil', component:ProfilComponent
  },
  {
    path:'overview', component:OverviewComponent
  },
  {
    path:'seeall', component:SeeallComponent
  },
  {
    path:'detail/:id', component:DetailsheetComponent
  },
  {
    path:'**', component:DiscoverComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
