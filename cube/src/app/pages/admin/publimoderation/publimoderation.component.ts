import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'src/app/cookie.service';

@Component({
  selector: 'app-publimoderation',
  templateUrl: './publimoderation.component.html',
  styleUrls: ['./publimoderation.component.css']
})
export class PublimoderationComponent implements OnInit {
  publications: any[] = [];
  displayedPublications: any[] = [];
  showAllPublications: boolean = false;
  token!: string;

  constructor(private http: HttpClient, private cookieService:CookieService) { }

  ngOnInit() {
    this.token = this.cookieService.getCookie('token') ?? '';

    this.fetchPublications();
  }

  fetchPublications() {
    const token = this.cookieService.getCookie('token');
    const httpOptions = token ? {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    } : {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    this.http.get<any>('http://localhost:8000/api/public/publications', httpOptions)
      .subscribe(response => {
        this.publications = response;
        this.displayedPublications = this.publications.filter(publication => publication.status === 'pending').slice(0, 5);
      }, error => {
        console.error(error);
      });
  }
  
  acceptPublication(publication: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  
    const publicationData = {
      status: 'approved'
    };
  
    this.http.put(`http://localhost:8000/api/publications/${publication.id}`, publicationData, httpOptions)
      .subscribe(
        response => {
          console.log('Publication mise à jour avec succès', response);
          publication.status = 'approved';
        },
        error => {
          console.error('Erreur lors de la mise à jour de la publication', error);
        }
      );
  }

  rejectPublication(publication: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  
    const publicationData = {
      status: 'refused'
    };
  
    this.http.put(`http://localhost:8000/api/publications/${publication.id}`, publicationData, httpOptions)
      .subscribe(
        response => {
          console.log('Publication mise à jour avec succès', response);
          publication.status = 'refused';
        },
        error => {
          console.error('Erreur lors de la mise à jour de la publication', error);
        }
      );
  }
  

  loadMorePublications() {
    const startIndex = this.displayedPublications.length;
    const endIndex = startIndex + 5;
    const nextPublications = this.publications
      .filter(publication => publication.status === 'pending') // Filtrer les publications approuvées
      .slice(startIndex, endIndex);
    this.displayedPublications = this.displayedPublications.concat(nextPublications);
  }
  
}

