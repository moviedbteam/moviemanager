import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { BibliothequeComponent } from './bibliotheque/bibliotheque.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DetailComponent } from './detail/detail.component';
import { FicheComponent } from './fiche/fiche.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path:'', component:AccueilComponent
  },
  {
    path:'login', component:ConnexionComponent
  },
  {
    path:'list', component:ListComponent
  },
  {
    path:'detail/:id', component:DetailComponent
  },
  {
    path:'bibliotheque', component:BibliothequeComponent
  },
  {
    path:'fiche', component:FicheComponent
  },
  {
    path:'ajouter', component:AjouterComponent
  },
  {
    path:'**', component:ListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
