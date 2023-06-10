import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isAdmin().pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigate(['']); // Redirect to home if not admin
          return false;
        }
      })
    );
  }
}
