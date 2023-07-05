import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'src/app/cookie.service';
import { Router } from '@angular/router';
import { CategoriesPublicationService } from 'src/app/categories-publication.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications: any[] = [];
  displayedPublications: any[] = [];
  showAllPublications: boolean = false;
  token!: string;
  filteredPublications: any[] = [];
  selectedCategoryId: number = -1;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private categoriesPublicationsService: CategoriesPublicationService) { }

  ngOnInit() {
    this.token = this.cookieService.getCookie('token') ?? '';
    this.fetchPublications();

    this.categoriesPublicationsService.selectedCategoryId$.subscribe((categoryId) => {
      if (categoryId === -1) {
        this.filteredPublications = this.publications.filter(publication => publication.status === 'approved');
      } else {
        this.filteredPublications = this.publications.filter(publication => {
          return publication.category.id === categoryId && publication.status === 'approved';
        });
      }
    });
  }

  fetchPublications() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.get<any>('http://localhost:8000/api/public/publications', httpOptions)
      .subscribe(response => {
        this.publications = response;
        this.filteredPublications = this.publications.filter(publication => publication.status === 'approved').slice(0, 5);
        console.log(this.publications);
      }, error => {
        console.error(error);
      });
  }

  loadMorePublications() {
    const startIndex = this.filteredPublications.length;
    const endIndex = startIndex + 5;
    const nextPublications = this.publications
      .filter(publication => publication.status === 'approved') // Filtrer les publications approuvées
      .slice(startIndex, endIndex);
    this.filteredPublications = this.filteredPublications.concat(nextPublications);
  }

  showPublicationDetails(publicationId: string) {
    this.router.navigate(['/publication', publicationId]);
  }

  // Ajouter une publication en favoris
  addPublicationToFavorites(publicationId: string) {
    // Vérifier si l'utilisateur est connecté
    if (this.token) {
      // Récupérer l'ID de l'utilisateur
      const userId = this.cookieService.getCookie('userId') ?? '';
      // Créer l'objet à envoyer
      const data = {
        publicationId: publicationId,
        userId: userId
      };
      // Envoyer la requête
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + this.token,
        })
      };
      this.http.post<any>('http://localhost:8000/api/users/' + userId + '/favorites', data, httpOptions)
        .subscribe(response => {
          console.log(response);
          alert('Publication ajoutée en favoris avec succès');
        }, error => {
          console.error(error);
        });
    } else {
      alert('Veuillez vous connecter pour ajouter une publication en favoris');
    }
  }

}
