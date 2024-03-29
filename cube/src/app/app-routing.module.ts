import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { PublierComponent } from './pages/publier/publier.component';
import { PanelComponent } from './pages/admin/panel/panel.component';
import { AdminGuard } from './admin.guard';
import { ModGuard } from './mod.guard';
import { PublimoderationComponent } from './pages/admin/publimoderation/publimoderation.component';
import { PublicationdetailsComponent } from './components/publicationdetails/publicationdetails.component';
import { ShowPublicationComponent } from './pages/show-publication/show-publication.component';
import { GestionusersComponent } from './pages/admin/gestionusers/gestionusers.component';
import { MespublicationsComponent } from './pages/mespublications/mespublications.component';
import { ConnectedGuard } from './connected.guard';
import { RelationComponent } from './pages/relation/relation.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profil', component: ProfilComponent, canActivate: [ ConnectedGuard ]},
  { path: 'publier', component: PublierComponent, canActivate: [ ConnectedGuard ]},
  { path: 'panel', component: PanelComponent, canActivate: [ AdminGuard, ModGuard ] },
  { path: 'modressources', component: PublimoderationComponent, canActivate: [ ModGuard ]},
  { path: 'gestionusers', component: GestionusersComponent, canActivate: [ AdminGuard ]},
  { path: 'publication/:id', component: ShowPublicationComponent},
  { path: 'mespublications', component: MespublicationsComponent, canActivate: [ ConnectedGuard ]},
  { path: 'relation', component: RelationComponent, canActivate: [ ConnectedGuard ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
