import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { PublierComponent } from './pages/publier/publier.component';
import { PanelComponent } from './pages/panel/panel.component';
import { AdminGuard } from './admin.guard';
import { PublimoderationComponent } from './components/publimoderation/publimoderation.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'publier', component: PublierComponent},
  { path: 'panel', component: PanelComponent, canActivate: [ AdminGuard ] },
  { path: 'mod', component: PublimoderationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
