import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { PublierComponent } from './pages/publier/publier.component';
import { PanelComponent } from './pages/admin/panel/panel.component';
import { AdminGuard } from './admin.guard';
import { PublimoderationComponent } from './pages/admin/publimoderation/publimoderation.component';
import { SlideComponent } from './components/slide/slide.component';
import { NavbarpanelComponent } from './components/navbarpanel/navbarpanel.component';
import { PublicationdetailsComponent } from './components/publicationdetails/publicationdetails.component';
import { ShowPublicationComponent } from './pages/show-publication/show-publication.component';
import { GestionusersComponent } from './pages/admin/gestionusers/gestionusers.component';
import { MespublicationsComponent } from './pages/mespublications/mespublications.component';
import { DatePipe } from '@angular/common';
import { ConnectedGuard } from './connected.guard';
import { ModGuard } from './mod.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    PublicationsComponent,
    ProfilComponent,
    PublierComponent,
    PanelComponent,
    PublimoderationComponent,
    SlideComponent,
    NavbarpanelComponent,
    PublicationdetailsComponent,
    ShowPublicationComponent,
    GestionusersComponent,
    MespublicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AdminGuard,
    ConnectedGuard,
    ModGuard,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
