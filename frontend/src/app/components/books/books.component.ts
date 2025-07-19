import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { id: 0, title: '', author: '' };
  editingBook: Book | null = null;
  isLoading = false;
  isAdding = false;
  isUpdating = false;
  error = '';
  currentUser: any = null;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.currentUser = this.authService.getCurrentUser();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.error = '';
    
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load books';
        this.isLoading = false;
      }
    });
  }

  addBook(): void {
    if (this.newBook.title && this.newBook.author) {
      this.isAdding = true;
      
      this.bookService.createBook(this.newBook).subscribe({
        next: (book) => {
          this.books.push(book);
          this.newBook = { id: 0, title: '', author: '' };
          this.isAdding = false;
        },
        error: (err) => {
          this.error = 'Failed to add book';
          this.isAdding = false;
        }
      });
    }
  }

  editBook(book: Book): void {
    this.editingBook = { ...book };
  }

  updateBook(): void {
    if (this.editingBook) {
      this.isUpdating = true;
      
      this.bookService.updateBook(this.editingBook.id, this.editingBook).subscribe({
        next: () => {
          const index = this.books.findIndex(b => b.id === this.editingBook!.id);
          if (index !== -1) {
            this.books[index] = { ...this.editingBook! };
          }
          this.cancelEdit();
          this.isUpdating = false;
        },
        error: (err) => {
          this.error = 'Failed to update book';
          this.isUpdating = false;
        }
      });
    }
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(b => b.id !== id);
        },
        error: (err) => {
          this.error = 'Failed to delete book';
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingBook = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 