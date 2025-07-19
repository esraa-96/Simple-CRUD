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
  template: `
    <div class="books-container">
      <div class="header">
        <h1>Books Management</h1>
        <div class="user-info">
          <span>Welcome, {{ currentUser?.email || 'User' }}</span>
          <button (click)="logout()" class="btn btn-secondary">Logout</button>
        </div>
      </div>

      <div class="add-book-section">
        <h3>Add New Book</h3>
        <form (ngSubmit)="addBook()" #addBookForm="ngForm" class="add-book-form">
          <div class="form-row">
            <div class="form-group">
              <label for="title">Title:</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                [(ngModel)]="newBook.title" 
                required 
                class="form-control"
                placeholder="Enter book title">
            </div>
            <div class="form-group">
              <label for="author">Author:</label>
              <input 
                type="text" 
                id="author" 
                name="author" 
                [(ngModel)]="newBook.author" 
                required 
                class="form-control"
                placeholder="Enter author name">
            </div>
            <button type="submit" [disabled]="!addBookForm.valid || isAdding" class="btn btn-primary">
              {{ isAdding ? 'Adding...' : 'Add Book' }}
            </button>
          </div>
        </form>
      </div>

      <div class="books-list">
        <h3>Books List</h3>
        <div *ngIf="isLoading" class="loading">Loading books...</div>
        <div *ngIf="error" class="error-message">{{ error }}</div>
        
        <div class="books-grid" *ngIf="!isLoading && books.length > 0">
          <div class="book-card" *ngFor="let book of books">
            <div class="book-info">
              <h4>{{ book.title }}</h4>
              <p><strong>Author:</strong> {{ book.author }}</p>
              <p><strong>ID:</strong> {{ book.id }}</p>
            </div>
            <div class="book-actions">
              <button (click)="editBook(book)" class="btn btn-sm btn-primary">Edit</button>
              <button (click)="deleteBook(book.id)" class="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        </div>
        
        <div *ngIf="!isLoading && books.length === 0" class="no-books">
          No books found. Add your first book above!
        </div>
      </div>

      <!-- Edit Modal -->
      <div *ngIf="editingBook" class="modal-overlay" (click)="cancelEdit()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Edit Book</h3>
          <form (ngSubmit)="updateBook()" #editBookForm="ngForm">
            <div class="form-group">
              <label for="editTitle">Title:</label>
              <input 
                type="text" 
                id="editTitle" 
                name="editTitle" 
                [(ngModel)]="editingBook.title" 
                required 
                class="form-control">
            </div>
            <div class="form-group">
              <label for="editAuthor">Author:</label>
              <input 
                type="text" 
                id="editAuthor" 
                name="editAuthor" 
                [(ngModel)]="editingBook.author" 
                required 
                class="form-control">
            </div>
            <div class="modal-actions">
              <button type="submit" [disabled]="!editBookForm.valid || isUpdating" class="btn btn-primary">
                {{ isUpdating ? 'Updating...' : 'Update' }}
              </button>
              <button type="button" (click)="cancelEdit()" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
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