import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from './login-response.interface';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  seConnecter() {
    const url = 'http://localhost:8000/api/login_check';
    const payload = { username: this.email, password: this.password };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<LoginResponse>(url, payload, httpOptions).subscribe(
      response => {
        // Extract the JWT token and user ID from the response
        const token = response.token;
        const userId = response.user.id;

        // Store the JWT token in a cookie
        this.cookieService.setCookie('token', token, 7); // Set cookie for 7 days

        // You can also store the user ID if needed
        this.cookieService.setCookie('userId', userId, 7);

        this.router.navigate(['']);

        // Perform other actions, such as redirecting the user to another page
      },
      error => {
        // Handle login errors
        this.errorMessage = "Mot de passe incorrect";
      }
    );
  }  
}
