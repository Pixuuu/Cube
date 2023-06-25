import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'src/app/cookie.service';

@Component({
  selector: 'app-publicationdetails',
  templateUrl: './publicationdetails.component.html',
  styleUrls: ['./publicationdetails.component.css']
})
export class PublicationdetailsComponent implements OnInit {
  
  publication: any;
  comments: any[] = [];
  newCommentText: string = '';
  token: string;
  userId: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private cookieService: CookieService) {
    this.token = this.cookieService.getCookie('token') ?? '';
    this.userId = this.cookieService.getCookie('userId') ?? '';
  }

  ngOnInit() {
    const publicationId = this.route.snapshot.paramMap.get('id');
    if (publicationId) {
      this.fetchPublicationDetails(publicationId);
      this.fetchComments(publicationId);
    }
  }

  fetchPublicationDetails(publicationId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.get<any>('http://localhost:8000/api/public/publications/' + publicationId, httpOptions)
      .subscribe(response => {
        this.publication = response;
        console.log(this.publication);
      }, error => {
        console.error(error);
      });
  }

  fetchComments(publicationId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.get<any>('http://localhost:8000/api/public/publications/' + publicationId, httpOptions)
      .subscribe(response => {
        this.comments = response.comments.map((comment: any) => {
          return { ...comment, showReply: false, replyText: '' };
        });
      }, error => {
        console.error(error);
      });
  }

  createComment() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${this.token}`,
      })
    };

    const newComment = {
      content: this.newCommentText,
      idPublication: this.publication.id,
      idUser: this.userId,
    };

    this.http.post<any>('http://localhost:8000/api/comments', newComment, httpOptions)
      .subscribe(response => {
        // Refresh comments after successful creation
        this.fetchComments(this.publication.id);
        // Reset new comment text
        this.newCommentText = '';
        console.log(response);
      }, error => {
        console.error(error);
      });
  }

  createCommentReply(comment: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${this.token}`,
      })
    };

    const newReply = {
      idPublication: this.publication.id,
      idUser: this.userId,
      content: comment.replyText,
      idReply: comment.id // Utilisez l'ID du commentaire parent comme idReply
    };

    console.log(newReply);

    this.http.post<any>('http://localhost:8000/api/comments', newReply, httpOptions)
      .subscribe(response => {
        // Refresh comments after successful reply creation
        this.fetchComments(this.publication.id);
        console.log(response);
      }, error => {
        console.error(error);
      });
  }

  toggleReplySection(comment: any) {
    comment.showReply = !comment.showReply;
    comment.replyText = ''; // Réinitialiser le texte de la réponse
  }

}
