import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.fetchUserDetails().subscribe(
      (response: any) => {
        this.user = response;
        if (!this.authService.isAuthenticated()) {
          this.router.navigate(['']); // Remplacez '/home' par la route de votre page d'accueil
        }
      },
      error => {
        console.error('An error occurred while fetching user details:', error);
      }
    );
  }

}
