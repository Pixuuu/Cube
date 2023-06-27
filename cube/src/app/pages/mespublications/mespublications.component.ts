import { Component } from '@angular/core';
import { CookieService } from 'src/app/cookie.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mespublications',
  templateUrl: './mespublications.component.html',
  styleUrls: ['./mespublications.component.css']
})
export class MespublicationsComponent {

  publication: any;
  token: string;
  userId: string;
  
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.token = this.cookieService.getCookie('token') ?? '';
    this.userId = this.cookieService.getCookie('userId') ?? '';
  }

  ngOnInit(){

    if (this.userId){
      this.fetchMyPublications(this.userId);
    }
  }

  fetchMyPublications(userId: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.get<any>('http://localhost:8000/api/public/publications/' + userId, httpOptions) //requête à faire
      .subscribe(response => {
        this.publication = response;
        console.log(this.publication);
      }, error => {
        console.error(error);
      });
  }



}
