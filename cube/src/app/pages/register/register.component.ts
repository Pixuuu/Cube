import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loggedInUser: any; // Déclarez le type approprié pour loggedInUser
  
  passError: boolean = false;
  termsError: boolean = false;
  acceptTerms: boolean = false;

  firstName: string = '';
  lastName: string = '';
  birthday: string = '';
  email: string = '';
  password: string = '';
  c_password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  validateAndRegister() {
    if (this.password !== this.c_password) {
      this.passError = true; 
      return; // Arrête l'exécution de la méthode si les mots de passe ne correspondent pas
    }

    if (!this.acceptTerms) {
      this.termsError = true;
      return;
    }
    
    // Les mots de passe correspondent, appeler la méthode registerUser() pour soumettre le formulaire
    this.registerUser();
  }

  registerUser(){

    const url = 'http://api.test/api/register';

    this.http.post(url, { firstName: this.firstName, lastName: this.lastName, email: this.email, birthday: this.birthday, password: this.password, c_password: this.c_password }).subscribe({
      next: response => {
        // Gérer la réponse de l'API REST
        console.log(response);
        
        // Vérifier si la connexion est réussie
        if (response) {
          this.router.navigate(['']);
  
        } else {
          // Gérer les cas d'échec de connexion
          console.error(response);
        }
      },
      error: error => {
        // Gérer les erreurs de l'API REST
        console.error(error);
      }
    });
  }
}
