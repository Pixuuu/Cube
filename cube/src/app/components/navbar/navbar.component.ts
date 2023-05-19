import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  loggedInMenu: any;
  guestMenu: any;

  constructor(public route: Router, public authService: AuthService) { }

  ngOnInit() {
    // Récupérer l'état de connexion depuis le localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.authService.setLoggedIn(isLoggedIn);
  }
  

  redirection(route: string): void {
    this.route.navigate([route]);
  }

  logout() {
    this.authService.logout();
  }
}
