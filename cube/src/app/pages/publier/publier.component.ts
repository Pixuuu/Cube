import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'src/app/cookie.service';

@Component({
  selector: 'app-publier',
  templateUrl: './publier.component.html',
  styleUrls: ['./publier.component.css']
})

export class PublierComponent {
  userId: number | null = null;

  publication: {
    title: string;
    description: string;
    idCategory: number;
    language: string;
    support: string;
    relationalType: string;
    status: string;
    idPublisher: number | null;
  } = {
    title: '',
    description: '',
    idCategory: 0,
    language: '',
    support: '',
    relationalType: '',
    status: 'pending',
    idPublisher: null
  };

  constructor(private http: HttpClient, private cookieService: CookieService, private authService: AuthService) {

    const token = this.cookieService.getCookie('token');
    if (token) {
      this.userId = authService.getUserIdFromCookie();
    }
   }

  onSubmit(): void {
    const publicationData = { ...this.publication };
    publicationData.idPublisher = this.userId;

    this.http.post('http://localhost:8000/api/publications', publicationData)
      .subscribe(
        response => {
          console.log('Publication créée avec succès', response);
          // Réinitialiser les valeurs du formulaire
          this.publication = {
            title: '',
            description: '',
            idCategory: 0,
            language: '',
            support: '',
            relationalType: '',
            status: 'pending',
            idPublisher: null
          };
        },
        error => {
          console.error('Erreur lors de la création de la publication', error);
        }
      );
  }
}

