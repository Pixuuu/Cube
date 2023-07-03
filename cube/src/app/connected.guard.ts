import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isConnected().pipe(
      map(isConnected => {
        if (isConnected) {
          return true;
        } else {
          this.router.navigate(['']); // Redirection à home si l'utilisateur n'est pas Admin
          return false;
        }
      })
    );
  }
  
}
