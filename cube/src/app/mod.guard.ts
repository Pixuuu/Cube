import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isMod().pipe(
      map(isMod => {
        if (isMod) {
          return true;
        } else {
          this.router.navigate(['']); // Redirection à home si l'utilisateur n'est pas Mod
          return false;
        }
      })
    );
  }
}
