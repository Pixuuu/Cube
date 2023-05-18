import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  utilisateur!: string;
  motdepasse!: string;

  constructor(private http: HttpClient) {}

  seConnecter() {
    const url = 'https://votre-api-rest.com/auth'; // Remplacez par l'URL de votre API REST

    const data = {
      utilisateur: this.utilisateur,
      motdepasse: this.motdepasse
    };

    this.http.post(url, data).subscribe(
      response => {
        // Gérer la réponse de l'API REST
        console.log(response);
      },
      error => {
        // Gérer les erreurs de l'API REST
        console.error(error);
      }
    );
  }
}
