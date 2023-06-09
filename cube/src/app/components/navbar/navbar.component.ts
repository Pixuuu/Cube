import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'src/app/cookie.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: number | null = null;
  isAuthenticated: boolean = false;
  firstName: string = '';

  constructor(public router: Router, public authService: AuthService, private cookieService: CookieService) {
    const token = this.cookieService.getCookie('token');
    if (token) {
      this.userId = authService.getUserIdFromCookie();
    }
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();

    if(this.isAuthenticated){
    this.authService.fetchUserDetails().subscribe(
      (response: any) => {
        this.firstName = response.firstname;
        console.log(this.firstName);
      },
      error => {
        console.error('An error occurred while fetching user details:', error);
      }
    
    );
    }
  }

  redirection(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.cookieService.deleteCookie('token');
    window.location.reload();
  }
}
