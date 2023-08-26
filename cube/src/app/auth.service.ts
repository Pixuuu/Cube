import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from './cookie.service';
import { Observable, throwError, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUserDetails(userId: number): Observable<any> {
    const token = this.cookieService.getCookie('token');

    if (token){
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token // Inclure le token JWT dans l'en-tête d'autorisation
      })
    };
  
    return this.http.get<any>(`http://127.0.0.1:8000/api/users/${userId}`, httpOptions).pipe(
      catchError(error => {
        console.error('An error occurred while retrieving user details:', error);
        // Gérer les erreurs de récupération des détails de l'utilisateur
        return throwError(error);
      })
    );
    }
    return of(null);
  }

  fetchUserDetails(): Observable<any> {
    const userId = this.getUserIdFromCookie();
    if (!userId) {
      return throwError('User ID not found in cookie');
    }

    return this.getUserDetails(userId);
  }

  getUserIdFromCookie(): number | null {
    const userId = this.cookieService.getCookie('userId');
    return userId ? +userId : null;
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.getCookie('token');
  
    if (!token) {
      return false; // Le token n'est pas présent
    }
  
    // Vérifier si le token est expiré en comparant la date d'expiration avec la date actuelle
    const tokenExpirationDate = this.getTokenExpirationDate(token);
    const isTokenExpired = tokenExpirationDate <= new Date();
  
    return !isTokenExpired; // Renvoie true si le token est présent et non expiré, sinon false
  }

  isAdmin(): Observable<boolean> {
    return this.fetchUserDetails().pipe(
      map(user => user && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_SUPERADMIN'))),
      catchError(error => {
        console.error('An error occurred while fetching user details:', error);
        // Gérer les erreurs de récupération des détails de l'utilisateur
        return of(false);
      })
    );
  }

  isMod(): Observable<boolean> {
    return this.fetchUserDetails().pipe(
      map(user => user && (user.roles.includes('ROLE_MOD') || user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_SUPERADMIN'))),
      catchError(error => {
        console.error('An error occurred while fetching user details:', error);
        // Gérer les erreurs de récupération des détails de l'utilisateur
        return of(false);
      })
    );
  }
  
  isConnected(): Observable<boolean> {
    return this.fetchUserDetails().pipe(
      map(user => user && (user.roles.includes('ROLE_USER'))),
      catchError(error => {
        console.error('An error occurred while fetching user details:', error);
        // Gérer les erreurs de récupération des détails de l'utilisateur
        return of(false);
      })
    );
  }  
  
  private getTokenExpirationDate(token: string): Date {
    // Extraire la date d'expiration du token
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    const expirationDateInSeconds = payload.exp;
    const expirationDateInMilliseconds = expirationDateInSeconds * 1000;
    
    // Créer un objet Date à partir de la date d'expiration en millisecondes
    const expirationDate = new Date(expirationDateInMilliseconds);
  
    return expirationDate;
  }
}
