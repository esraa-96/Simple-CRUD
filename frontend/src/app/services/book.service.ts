import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/book`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/book/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/book`, book);
  }

  updateBook(id: number, book: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/book/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/book/${id}`);
  }
} 