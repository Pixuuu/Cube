import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/cookie.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;
  selectedFile: File | null = null;
  token!: string;
  userId!: string;
  formattedBirthday: string = '';
  modifiedData: any = {};

  constructor(private cookieService: CookieService, private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.token = this.cookieService.getCookie('token') ?? '';
    this.authService.fetchUserDetails().subscribe(
      (response: any) => {
        this.user = response;
        this.userId = response.idPublisher; // Récupérer l'ID du publisher
        if (!this.authService.isAuthenticated()) {
          this.router.navigate(['']); // Route [''] = home
        }
      },
      error => {
        console.error('An error occurred while fetching user details:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadPhoto();
  }

  uploadPhoto() {
    const userId = this.authService.getUserIdFromCookie();
    
    if (userId && this.selectedFile) {
      const photoData = {
        idPublisher: userId.toString(),
        photo: this.selectedFile.name
      };
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
  
      this.http.put(`http://localhost:8000/api/users/${userId}`, photoData, httpOptions)
        .subscribe(
          (response: any) => {
            console.log('Photo uploaded successfully');
            const photoFileName = response.fileName; // Récupérer le nom de la photo renvoyé par l'API
            this.user.photo = photoFileName; // Enregistrer le nom du fichier dans la propriété "photo"

          },
          error => {
            console.error('An error occurred while uploading photo:', error);
          }
        );
    }
  }

  updateModifiedData(propertyName: string, value: any) {
    this.modifiedData[propertyName] = value;
  }
  
  saveProfile() {
    const userId = this.authService.getUserIdFromCookie();
    
    if (userId) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };

      const modifiedProperties = {
        idPublisher: userId,
        ...this.modifiedData
      };

      this.http.put(`http://localhost:8000/api/users/${userId}`, modifiedProperties, httpOptions)
        .subscribe(
          (response: any) => {
            console.log('Le profil a bien été mis à jour');
            this.modifiedData = {}; // Réinitialiser les données modifiées après la mise à jour réussie
          },
          error => {
            console.error('Une erreur est survenue lors de la mise à jour du profil', error);
          }
        );
    } else {
      console.error("UserId n'a pas été trouvé");
    }
  }
}
