import { Component } from '@angular/core';
import { CookieService } from 'src/app/cookie.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-gestionusers',
  templateUrl: './gestionusers.component.html',
  styleUrls: ['./gestionusers.component.css']
})
export class GestionusersComponent {

  asset: string = '';
  userIdDesactivated: number = 0;
  userIdActivated: number = 0;
  userIdRole: number = 0;
  selectedRole: string[] = [];

constructor(private http: HttpClient, private cookieService: CookieService ){
 }

 activateAccount() {
  const token = this.cookieService.getCookie('token');
  const userId = this.cookieService.getCookie('userId');
  const userIdActivated = this.userIdActivated;

  if (userIdActivated) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token
      })
    };

    const body = { 
      idPublisher: userId,
      asset: true
    }; // Le corps de la requête pour activer le compte

    this.http.put<any>(`http://localhost:8000/api/users/${userIdActivated}`, body, httpOptions)
      .subscribe(
        response => {
          console.log("L'utilisateur a bien été activé");
        },
        error => {
          console.error(error)
        }
      );
  }
}

deactivateAccount() {
  const token = this.cookieService.getCookie('token');
  const userId = this.cookieService.getCookie('userId');
  const userIdDesactivated = this.userIdDesactivated;

  if (userIdDesactivated) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token
      })
    };

    const body = { 
      idPublisher: userId,
      asset: false
    }; // Le corps de la requête pour désactiver le compte

    this.http.put<any>(`http://localhost:8000/api/users/${userIdDesactivated}`, body, httpOptions)
      .subscribe(
        response => {
          console.log("L'utilisateur a bien été désactivé");
        },
        error => {
          console.error(error)
        }
      );
  }
}

changeRole() {
  const token = this.cookieService.getCookie('token');
  const userId = this.cookieService.getCookie('userId');
  const userIdRole = this.userIdRole;
  const role = this.selectedRole;
  console.log(this.selectedRole);

  if (userIdRole) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token
      })
    };

    const body = {
      idPublisher: userId,
      roles: [role]
    }; // Le corps de la requête pour changer le rôle de l'utilisateur

    this.http.put<any>(`http://localhost:8000/api/users/${userIdRole}`, body, httpOptions)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
  }
}
}
