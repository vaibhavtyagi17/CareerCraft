# CareerCraft - Complete Project Structure

## 📂 Project Directory Layout

```
/Users/vaibhavtyagi/Desktop/finalcap/CareerCraft/
│
├── 📄 package.json                 # Dependencies and scripts
├── 📄 server.js                    # Main Express server
├── 📄 .env                         # Environment variables
├── 📄 README.md                    # Full documentation
├── 📄 QUICKSTART.md               # Quick start guide
│
├── 📁 config/                      # Configuration files
│   ├── database.js                # SQLite setup & tables
│   └── jwt.js                     # JWT token management
│
├── 📁 controllers/                 # Business logic
│   └── authController.js          # Authentication functions
│
├── 📁 middleware/                  # Custom middleware
│   └── auth.js                    # Authentication checker
│
├── 📁 routes/                      # API route handlers
│   └── auth.js                    # Auth endpoints
│
├── 📁 public/                      # Frontend files
│   ├── 📄 index.html              # Home page
│   ├── 📄 login.html              # Login page
│   ├── 📄 signup.html             # Sign up page
│   │
│   ├── 📁 css/
│   │   └── style.css              # All styling (responsive)
│   │
│   ├── 📁 js/
│   │   ├── main.js                # Home page functionality
│   │   ├── login.js               # Login logic & remember me
│   │   └── signup.js              # Sign up logic
│   │
│   └── 📁 images/                 # Image assets folder
│
└── 📁 database/                    # Auto-created
    └── careercraft.db             # SQLite database (auto-created)
```

## 📋 File Descriptions

### Backend Files

#### `server.js` (Main Application)
- Express server setup
- Middleware configuration
- Route registration
- Static file serving
- Error handling

#### `config/database.js`
- SQLite connection
- Table creation (users, sessions, audit_log)
- Database initialization

#### `config/jwt.js`
- JWT token generation
- Token verification
- Secret key management

#### `controllers/authController.js`
- Signup logic with password hashing
- Login logic with validation
- Token verification
- Error handling

#### `middleware/auth.js`
- JWT token validation
- Protected route middleware
- User context setting

#### `routes/auth.js`
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/verify

### Frontend Files

#### `public/index.html`
- Home page structure
- Navigation bar
- Hero section
- Services showcase (4 services)
- About Us section
- Team member placeholder
- Footer with links

#### `public/login.html`
- Login form with validation
- Email input field
- Password input with toggle visibility
- Remember me checkbox
- Error/success messages
- Link to sign up page

#### `public/signup.html`
- Sign up form with validation
- Full name input
- Email input
- Password input
- Confirm password input
- Error/success messages
- Link to login page

#### `public/css/style.css`
- CSS variables (colors, shadows, transitions)
- Navbar styling (responsive)
- Hero section (gradient background, animations)
- Services grid (responsive)
- About section
- Team section
- Login/signup cards
- Footer styling
- Mobile responsive design
- Animations and hover effects

#### `public/js/main.js`
- Navigation smooth scrolling
- Session checking
- User logout
- Navbar update with user info
- Scroll animations
- Intersection Observer for animations

#### `public/js/login.js`
- Form submission handling
- Email validation
- Remember me functionality
- Password visibility toggle
- API call to backend
- LocalStorage management
- Error handling

#### `public/js/signup.js`
- Form submission handling
- Full form validation
- Password confirmation check
- API call to backend
- Success/error messages
- Password visibility toggle
- Form reset

### Configuration Files

#### `package.json`
- Project metadata
- Dependencies list
- NPM scripts (start, dev)

#### `.env`
- PORT=5000
- JWT_SECRET=careercraft_secret_key_change_in_production
- NODE_ENV=development

### Documentation Files

#### `README.md`
- Complete project documentation
- Feature list
- Tech stack
- Installation instructions
- API endpoint details
- Customization guide
- Deployment instructions
- Security notes

#### `QUICKSTART.md`
- Quick start guide
- Feature overview
- Database structure
- Security features
- Customization tips
- Responsive design info
- Testing instructions
- Troubleshooting
- Environment variables
- Deployment options

---

## 🔄 Data Flow

### Sign Up Flow
1. User fills form on `signup.html`
2. JavaScript validates input (`public/js/signup.js`)
3. Sends POST to `/api/auth/signup`
4. Backend receives in `authController.js`
5. Password hashed with bcryptjs
6. User stored in SQLite database
7. JWT token generated
8. Response sent back to frontend
9. User redirected to home page

### Login Flow
1. User fills form on `login.html`
2. JavaScript validates input (`public/js/login.js`)
3. Sends POST to `/api/auth/login`
4. Backend queries database for user
5. Password compared with hash
6. JWT token generated
7. Remember me email saved to localStorage (if checked)
8. Response sent to frontend
9. User redirected to home page

### Remember Me Flow
1. User checks "Remember me" checkbox
2. Email saved to localStorage with timestamp
3. On next visit, `login.js` checks localStorage
4. If data < 7 days old, email field pre-filled
5. User only needs to enter password

---

## 🌐 Service Integration Links

### In index.html Services Section:
1. **Job Finder**: https://job-finder-murex-zeta.vercel.app/
2. **Code Tracker**: https://coding-tracker-pearl.vercel.app/
3. **AI Resume Analyzer**: https://resanalyser.vercel.app/
4. **AI Mock Interview**: (Link to be added)

---

## 🗃️ Database Tables

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Sessions Table
```sql
CREATE TABLE sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
```

### Audit Log Table
```sql
CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
```

---

## 🎯 CSS Classes Reference

### Layout
- `.container` - Max width wrapper
- `.nav-container` - Navigation wrapper
- `.hero` - Hero section
- `.services` - Services section
- `.about` - About section
- `.login-section` - Login/signup section
- `.footer` - Footer section

### Components
- `.navbar` - Navigation bar
- `.nav-logo` - Logo styling
- `.nav-menu` - Menu list
- `.nav-link` - Menu links
- `.login-btn` - Login button in navbar
- `.service-card` - Service card container
- `.service-icon` - Service icon wrapper
- `.team-member` - Team member card
- `.login-card` - Login form card
- `.form-group` - Form field wrapper
- `.input-wrapper` - Input field wrapper
- `.cta-button` - Call-to-action button
- `.message` - Message display (success/error)

### States
- `.success` - Success message state
- `.error` - Error message state
- `.coming-soon` - Disabled service state

---

## 🔑 Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| PORT | 5000 | Server port |
| JWT_SECRET | careercraft_secret_key... | JWT signing key |
| NODE_ENV | development | Environment mode |

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| cors | ^2.8.5 | Cross-origin handling |
| dotenv | ^16.0.3 | Environment variables |
| bcryptjs | ^2.4.3 | Password hashing |
| jsonwebtoken | ^9.0.0 | JWT tokens |
| sqlite3 | ^5.1.6 | Database |
| nodemon | ^2.0.22 | Dev auto-reload |

---

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Access application
http://localhost:5000

# Create new user
1. Go to /signup.html
2. Fill form and submit

# Login
1. Go to /login.html
2. Enter credentials
3. Check "Remember me"
4. Submit

# Test API directly
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 📝 Notes

- Database is auto-created on first run
- Default JWT expiration: 7 days
- Remember me data expires: 7 days
- Password hashing: 10 salt rounds
- All passwords are hashed (never stored plain text)
- Email is unique (no duplicate accounts)

---

**Last Updated**: January 26, 2026
**Version**: 1.0.0
