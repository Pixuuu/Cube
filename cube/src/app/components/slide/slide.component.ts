import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'src/app/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent {

  isAuthenticated: boolean = false;
  userId: number | null = null;

  constructor(public router: Router, public authService: AuthService, private cookieService: CookieService) {
    const token = this.cookieService.getCookie('token');

    if (token){
      this.userId = authService.getUserIdFromCookie();
    }
  }

  ngOnInit(){
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void{
    this.cookieService.deleteCookie('token');
    window.location.reload();
  }


}