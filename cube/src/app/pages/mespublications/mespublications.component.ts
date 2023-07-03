import { Component } from '@angular/core';
import { CookieService } from 'src/app/cookie.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mespublications',
  templateUrl: './mespublications.component.html',
  styleUrls: ['./mespublications.component.css']
})
export class MespublicationsComponent {

  user: any;
  publications: any;
  token: string;
  userId: string;
  selectedPublication: any = null;

  constructor(private http: HttpClient, private cookieService: CookieService, private datePipe: DatePipe) {
    this.token = this.cookieService.getCookie('token') ?? '';
    this.userId = this.cookieService.getCookie('userId') ?? '';
  }

  ngOnInit() {
    if (this.userId) {
      this.fetchMyPublications(this.userId);
    }
  }

  fetchMyPublications(userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token,
      })
    };

    this.http.get<any>('http://localhost:8000/api/users/' + userId, httpOptions)
      .subscribe(response => {
        this.publications = response.publications;
        console.log(this.publications);
      }, error => {
        console.error(error);
      });
  }

  deletePublication(publicationId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token,
      })
    };

    this.http.delete<any>('http://localhost:8000/api/publications/' + publicationId, httpOptions)
      .subscribe(() => {
        // Suppression réussie, mettre à jour la liste des publications
        this.fetchMyPublications(this.userId);
        console.log('Publication supprimée avec succès');
      }, error => {
        console.error('Erreur lors de la suppression de la publication', error);
      });
  }

  openEditModal(publication: any) {
    this.selectedPublication = { ...publication }; // Créez une copie de la publication pour l'édition
  }

  updatePublication() {
    if (!this.selectedPublication) {
      return; // Aucune publication sélectionnée, sortir de la méthode
    }

    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token,
      })
    };

    const publicationData = {
      idUser: this.userId,
      title: this.selectedPublication.title,
      description: this.selectedPublication.description,
      modified: currentDate
    };

    this.http.put<any>('http://localhost:8000/api/publications/' + this.selectedPublication.id, publicationData, httpOptions)
      .subscribe(response => {
        // Mettre à jour localement la publication modifiée dans le tableau des publications
        const updatedPublicationIndex = this.publications.findIndex((p: any) => p.id === this.selectedPublication.id);

        if (updatedPublicationIndex !== -1) {
          this.publications[updatedPublicationIndex] = this.selectedPublication;
        }


        this.selectedPublication = null;
        console.log('Publication mise à jour avec succès');
      }, error => {
        console.error('Erreur lors de la mise à jour de la publication', error);
      });
  }

  cancelEdit() {
    this.selectedPublication = null;
  }

}
