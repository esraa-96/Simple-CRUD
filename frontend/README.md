# Book Management System - Frontend

A modern Angular application for managing books with user authentication.

## Features

- **User Authentication**
  - Login with email and password
  - User registration with validation
  - JWT token-based authentication
  - Automatic logout on token expiration

- **Book Management**
  - View all books in a responsive grid layout
  - Add new books with title and author
  - Edit existing books
  - Delete books with confirmation
  - Real-time updates

- **Modern UI/UX**
  - Clean, responsive design
  - Loading states and error handling
  - Form validation
  - Modal dialogs for editing
  - Navigation with authentication state

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (v17)

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   │   └── login.component.ts
│   │   │   ├── register/
│   │   │   │   └── register.component.ts
│   │   │   └── books/
│   │   │       └── books.component.ts
│   │   ├── models/
│   │   │   ├── auth.model.ts
│   │   │   ├── book.model.ts
│   │   │   └── user.model.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── book.service.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── package.json
├── angular.json
└── tsconfig.json
```

## API Configuration

The frontend is configured to communicate with the backend API at:
- **Base URL**: `http://localhost:8000/api/v1.0`
- **Authentication**: JWT Bearer token
- **CORS**: Make sure your backend allows requests from `http://localhost:4200`

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes
- `npm test` - Run unit tests

## Authentication Flow

1. **Registration**: Users can create new accounts with email, username, and password
2. **Login**: Users authenticate with email and password
3. **Token Storage**: JWT tokens are stored in localStorage
4. **Protected Routes**: Books management requires authentication
5. **Logout**: Clears tokens and redirects to login

## Components

### LoginComponent
- Handles user authentication
- Form validation
- Error handling
- Redirects to books page on success

### RegisterComponent
- User registration form
- Password confirmation validation
- Success/error messaging
- Auto-redirect to login after successful registration

### BooksComponent
- CRUD operations for books
- Responsive grid layout
- Modal editing interface
- Real-time data updates
- User session management

## Services

### AuthService
- Manages authentication state
- Handles login/register API calls
- Token storage and retrieval
- User session management

### BookService
- CRUD operations for books
- HTTP communication with backend
- Error handling

## Styling

The application uses:
- CSS Grid and Flexbox for responsive layouts
- Modern CSS with custom properties
- Consistent color scheme and typography
- Mobile-first responsive design

## Development

### Adding New Features
1. Create components in `src/app/components/`
2. Add services in `src/app/services/`
3. Define models in `src/app/models/`
4. Update routing in `app.routes.ts`

### Code Style
- Use TypeScript strict mode
- Follow Angular style guide
- Use standalone components
- Implement proper error handling

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend allows requests from frontend origin
2. **Authentication Issues**: Check JWT token configuration
3. **API Connection**: Verify backend is running on port 8000
4. **Build Errors**: Run `npm install` to ensure all dependencies are installed

### Development Tips

- Use browser developer tools to debug API calls
- Check network tab for failed requests
- Use Angular DevTools for component debugging
- Monitor console for TypeScript errors

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist/frontend` folder to your web server

3. Configure your web server to handle Angular routing (SPA)

4. Update API URLs for production environment

## Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Include error handling
4. Test thoroughly before submitting

## License

This project is part of the Book Management System.
