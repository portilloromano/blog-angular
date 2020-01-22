import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
  }

  create(token: string, post: Post): Observable<any> {
    post.content = global.htmlEntities(post.content);

    let json = JSON.stringify(post);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'post', params, { headers: headers });
  }

  getPosts(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'post', { headers: headers });
  }

  getPostById(id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + `post/${id}`, { headers: headers });
  }

  update(token: string, post: Post, id: number): Observable<any> {
    post.content = global.htmlEntities(post.content);

    let json = JSON.stringify(post);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + `post/${id}`, params, { headers: headers });
  }

  delete(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(this.url + `post/${id}`, { headers: headers });
  }

  getPostsByCategoryId(id: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + `post/category/${id}`, { headers: headers });
  }

  getPostsByUserId(id: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + `post/user/${id}`, { headers: headers });
  }
}
