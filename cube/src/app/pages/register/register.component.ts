import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface RegisterRequestBody {
  email: string;
  password: string;
  birthday: string;
  c_password: string;
  lastname: string;
  firstname: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  passError: boolean = false;
  termsError: boolean = false;
  acceptTerms: boolean = false;

  firstname: string = '';
  lastname: string = '';
  birthday: string = '';
  email: string = '';
  password: string = '';
  c_password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

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

  registerUser() {
    const url = 'http://localhost:8000/api/register';

    const requestBody: RegisterRequestBody = {
      email: this.email,
      password: this.password,
      birthday: this.birthday,
      c_password: this.c_password,
      lastname: this.lastname,
      firstname: this.firstname
    };

    this.http.post(url, requestBody).subscribe({
      next: response => {
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
