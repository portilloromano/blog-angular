import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
   }

   create(token: string, category: Category): Observable<any> {
    let json = JSON.stringify(category);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);

    return this._http.post(this.url + 'category', params, { headers: headers });
  }

  delete(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(this.url + `category/${id}`, { headers: headers });
  }

  getCategories(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'category', { headers: headers });
  }

  getCategoryById(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + `category/${id}`, { headers: headers });
  }
}
