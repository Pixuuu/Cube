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
import { PanelComponent } from './pages/panel/panel.component';
import { AdminGuard } from './admin.guard';
import { PublimoderationComponent } from './components/publimoderation/publimoderation.component';
import { SlideComponent } from './components/slide/slide.component';

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
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
