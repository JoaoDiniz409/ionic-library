import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livros } from '../model/livros';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  endpoint = 'http://localhost:3000/livros'

  constructor(public http: HttpClient) { }

  public getLivros(): Observable<Livros[]> {
    return this.http.get<Livros[]>(this.endpoint);
  }

  addLivro(l: Livros): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.endpoint, JSON.stringify(l), httpOptions);
  }

  getById(id: number):  Observable<Livros> {
    return this.http.get<Livros>(this.endpoint + "/" + id);
  }

  updadeLivro(idItem: number, l: Livros): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.endpoint+"/"+idItem, JSON.stringify(l), httpOptions);
  }

  deleteLivro(id: number): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete(this.endpoint+"/"+id);
  }

}
