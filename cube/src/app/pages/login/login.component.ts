import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { LoginResponse } from './login-response.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  seConnecter() {
    const url = 'http://api.test/api/login';

    this.http.post<LoginResponse>(url, { email: this.email, password: this.password }).subscribe({
      next: response => {
        // Gérer la réponse de l'API REST
        console.log(response);
        
        // Vérifier si la connexion est réussie
        if (response.success) {
          // Enregistrer l'état de connexion dans le localStorage
          localStorage.setItem('isLoggedIn', 'true');
          this.authService.login();

          this.router.navigate(['']);
        } else {
          // Gérer les cas d'échec de connexion
          console.error(response.message);
        }
      },
      error: error => {
        // Gérer les erreurs de l'API REST
        console.error(error);
      }
    });
  }
}
