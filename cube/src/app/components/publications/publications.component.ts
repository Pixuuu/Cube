import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'src/app/cookie.service';

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

  constructor(private http: HttpClient, private cookieService:CookieService) { }

  ngOnInit() {
    this.token = this.cookieService.getCookie('token') ?? '';

    this.fetchPublications();
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
        this.displayedPublications = this.publications.filter(publication => publication.status === 'approved').slice(0, 5);
      }, error => {
        console.error(error);
      });
  }

  loadMorePublications() {
    const startIndex = this.displayedPublications.length;
    const endIndex = startIndex + 5;
    const nextPublications = this.publications
      .filter(publication => publication.status === 'approved') // Filtrer les publications approuvées
      .slice(startIndex, endIndex);
    this.displayedPublications = this.displayedPublications.concat(nextPublications);
  }
  
}

