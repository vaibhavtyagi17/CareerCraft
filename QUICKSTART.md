# CareerCraft - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js installed (v14+)
- npm or yarn package manager

### Installation

1. **Open Terminal and navigate to CareerCraft directory**:
```bash
cd /Users/vaibhavtyagi/Desktop/finalcap/CareerCraft
```

2. **Install all dependencies**:
```bash
npm install
```

This will install:
- express (web framework)
- cors (cross-origin handling)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- sqlite3 (database)
- dotenv (environment variables)
- nodemon (development auto-reload)

### Running the Application

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

### Access the Website

Open your browser and go to: **http://localhost:5000**

---

## 📋 Features Overview

### 1. **Home Page**
- Beautiful hero section with CTA button
- Navigation to all sections
- Professional branding

### 2. **Services Section**
- **Job Finder**: Browse job opportunities
  - Link: https://job-finder-murex-zeta.vercel.app/
  
- **Code Tracker**: Monitor coding progress
  - Link: https://coding-tracker-pearl.vercel.app/
  
- **AI Resume Analyzer**: Optimize your resume
  - Link: https://resanalyser.vercel.app/
  
- **AI Mock Interview**: Practice interviews - https://ai-mock-interview-ntzn.onrender.com/

### 3. **Authentication System**

#### Sign Up
- URL: http://localhost:5000/signup.html
- Required fields: Full Name, Email, Password
- Passwords must be 6+ characters
- Confirmation password required
- Secure password hashing with bcryptjs

#### Login
- URL: http://localhost:5000/login.html
- Email and password login
- **Remember Me Feature**:
  - Saves email for 7 days in localStorage
  - Password is NEVER saved
  - Checkbox to enable/disable
  - Auto-fills email on next visit

#### Session Management
- JWT tokens for secure sessions
- Token stored in localStorage as 'careercraft_user'
- 7-day token expiration
- Automatic logout option

### 4. **About Us Section**
- Company mission and values
- Why choose CareerCraft
- Team member profiles (ready to add with images)
- Professional descriptions

---

## 🗄️ Database Structure

### Users Table
```
- id (Primary Key)
- fullname (TEXT)
- email (UNIQUE)
- password (HASHED)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Sessions Table
```
- id (Primary Key)
- user_id (Foreign Key)
- token (UNIQUE)
- expires_at (DATETIME)
- created_at (TIMESTAMP)
```

### Audit Log Table
```
- id (Primary Key)
- user_id (Foreign Key)
- action (TEXT)
- details (TEXT)
- created_at (TIMESTAMP)
```

All data is stored in SQLite database at:
`/Users/vaibhavtyagi/Desktop/finalcap/CareerCraft/database/careercraft.db`

---

## 🔒 Security Features

✅ **Password Hashing**: bcryptjs with 10 salt rounds
✅ **JWT Authentication**: Secure token-based auth
✅ **CORS Protection**: Cross-origin resource sharing
✅ **Input Validation**: Email and password validation
✅ **Audit Logging**: Track all login/signup activities
✅ **No Password Storage**: Remember me only stores email

---

## 🎨 Customization

### Add Team Members
Edit `public/index.html` in the team section:
```html
<div class="team-member">
    <div class="team-member-image">
        <img src="path/to/image.jpg" alt="Name">
    </div>
    <div class="team-member-info">
        <h4>Member Name</h4>
        <p>Position/Role</p>
        <p class="bio">Bio information</p>
    </div>
</div>
```

### Change Colors
Edit CSS variables in `public/css/style.css`:
```css
:root {
    --primary-color: #0066cc;      /* Main blue */
    --secondary-color: #00d4ff;    /* Cyan */
    --accent-color: #ff6b35;       /* Orange */
    --dark-color: #1a1a1a;         /* Dark text */
    --light-color: #f8f9fa;        /* Light bg */
}
```

### Update Service Links
Edit service URLs in `public/index.html`:
- Find the service cards section
- Update the `href` attributes with new links

---

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

---

## 🧪 Testing the Application

### Test Sign Up
1. Go to http://localhost:5000/signup.html
2. Fill in credentials:
   - Name: John Doe
   - Email: john@example.com
   - Password: Test@123
   - Confirm Password: Test@123
3. Click "Create Account"
4. Should redirect to home page

### Test Login
1. Go to http://localhost:5000/login.html
2. Enter the same credentials
3. Check "Remember me on this device"
4. Click "Sign In"
5. Should redirect to home page with email in navbar

### Test Remember Me
1. Clear browser and revisit login page
2. Email should be pre-filled (if checked before)
3. Password field should be empty

---

## 📊 API Endpoints

### Public Endpoints

**Sign Up**
```
POST /api/auth/signup
Content-Type: application/json

{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "message": "Account created successfully",
  "userId": 1,
  "token": "jwt_token_here",
  "user": { ... }
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "userId": 1,
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Protected Endpoints

**Verify Token**
```
GET /api/auth/verify
Authorization: Bearer jwt_token_here

Response:
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "userId": 1,
    "email": "john@example.com"
  }
}
```

---

## 🐛 Troubleshooting

### Issue: Port 5000 is already in use
**Solution**: Edit .env file and change PORT to another number (e.g., 5001)

### Issue: npm install fails
**Solution**: 
```bash
rm package-lock.json
npm cache clean --force
npm install
```

### Issue: Database errors
**Solution**: The database folder is created automatically. If issues persist:
```bash
rm -rf database/
npm start
```
This will recreate the database from scratch.

### Issue: Passwords not hashing
**Solution**: Ensure bcryptjs is installed:
```bash
npm install bcryptjs
```

---

## 📝 Environment Variables

The `.env` file contains:
```
PORT=5000                              # Server port
JWT_SECRET=careercraft_secret_key...  # JWT signing key
NODE_ENV=development                   # Environment mode
```

**For Production**, change:
```
JWT_SECRET=your_very_strong_secret_key_here
NODE_ENV=production
```

---

## 🚀 Deployment Instructions

### Deploy to Vercel
1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Set environment variables in Vercel settings
4. Deploy!

### Deploy to Heroku
```bash
heroku login
heroku create careercraft-app
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Deploy to Render
1. Push to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Add environment variables
5. Deploy!

---

## 📞 Need Help?

- Check the README.md for detailed documentation
- Review the code comments for explanations
- Test each feature individually

---

**Website**: CareerCraft Professional Career Development Platform
**Version**: 1.0.0
**Created**: January 2026
