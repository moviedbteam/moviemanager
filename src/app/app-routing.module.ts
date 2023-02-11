import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { BibliothequeComponent } from './bibliotheque/bibliotheque.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FicheComponent } from './fiche/fiche.component';

const routes: Routes = [
  {
    path:'', component:AccueilComponent
  },
  {
    path:'login', component:ConnexionComponent
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
    path:'*', component:AccueilComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
