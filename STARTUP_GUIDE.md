# 🚀 Book Management System - Startup Guide

This guide will help you run both the .NET backend and Angular frontend applications.

## 📋 Prerequisites

- **.NET 8.0 SDK** (for backend)
- **Node.js v18+** (for frontend)
- **npm** or **yarn** (for frontend dependencies)

## 🔧 Backend Setup (.NET)

### 1. Navigate to Backend Directory
```bash
cd Base.WebApi
```

### 2. Restore Dependencies
```bash
dotnet restore
```

### 3. Run the Backend
```bash
dotnet run
```

**Expected Output:**
- Backend will start on `http://localhost:8000`
- Swagger UI will be available at `http://localhost:8000/swagger`
- In-memory database will be initialized with seed data

## 🎨 Frontend Setup (Angular)

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Frontend
```bash
npm start
```

**Expected Output:**
- Frontend will start on `http://localhost:4200`
- Browser should automatically open to the login page

## 🔐 Default Test Account

The system comes with a pre-seeded test account:

- **Email:** `admin@example.com`
- **Password:** `password123`

## 🧪 Testing the Application

### 1. Registration Flow
1. Go to `http://localhost:4200`
2. Click "Register here" link
3. Fill in the registration form
4. Submit to create a new account

### 2. Login Flow
1. Use the test account or your newly created account
2. Enter email and password
3. Click "Login"
4. You'll be redirected to the Books Management page

### 3. Book Management
1. **View Books:** See all books in a responsive grid
2. **Add Book:** Use the form at the top to add new books
3. **Edit Book:** Click "Edit" on any book card
4. **Delete Book:** Click "Delete" and confirm

## 🔧 Troubleshooting

### Backend Issues

**Port Already in Use:**
```bash
# Find process using port 8000
netstat -ano | findstr :8000
# Kill the process
taskkill /PID <process_id> /F
```

**Database Issues:**
- The app uses in-memory database, so data resets on restart
- No external database setup required

**JWT Issues:**
- JWT secret is now properly configured (32+ characters)
- Tokens expire after 1 hour

### Frontend Issues

**Angular CLI Not Found:**
```bash
npm install -g @angular/cli
```

**Port Already in Use:**
```bash
# Angular will automatically try port 4201, 4202, etc.
# Or manually specify port
ng serve --port 4201
```

**CORS Errors:**
- Backend CORS is configured for `http://localhost:4200`
- Make sure both apps are running

### Common Issues

**"Cannot connect to API":**
1. Ensure backend is running on port 8000
2. Check browser console for CORS errors
3. Verify API endpoints in Swagger UI

**"Login Failed":**
1. Use the test account: `admin@example.com` / `password123`
2. Check backend logs for authentication errors
3. Verify JWT configuration

## 📁 Project Structure

```
Authentication&Authorization/
├── Base.WebApi/           # .NET Backend
│   ├── Controllers/       # API endpoints
│   ├── Program.cs         # Main configuration
│   └── appsettings.json   # Configuration
├── frontend/              # Angular Frontend
│   ├── src/app/
│   │   ├── components/    # UI components
│   │   ├── services/      # API services
│   │   └── models/        # TypeScript interfaces
│   └── package.json       # Dependencies
└── STARTUP_GUIDE.md       # This file
```

## 🔄 Development Workflow

1. **Start Backend First:**
   ```bash
   cd Base.WebApi
   dotnet run
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **Make Changes:**
   - Backend: Changes auto-reload
   - Frontend: Changes auto-reload in browser

4. **Test Features:**
   - Register new users
   - Login with credentials
   - Manage books (CRUD operations)
   - Test responsive design

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1.0/user/register` | Register new user |
| POST | `/api/v1.0/user/login` | User login |
| GET | `/api/v1.0/book` | Get all books |
| POST | `/api/v1.0/book` | Create new book |
| PUT | `/api/v1.0/book/{id}` | Update book |
| DELETE | `/api/v1.0/book/{id}` | Delete book |

## 🚀 Next Steps

- Add more features (user profiles, book categories)
- Implement real database (SQL Server, PostgreSQL)
- Add unit tests
- Deploy to production
- Add more security features

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Check backend logs in the terminal
4. Verify all prerequisites are installed

---

**Happy Coding! 🎉** 