# CareerCraft - Professional Career Development Platform

A comprehensive, fully functional website providing career development tools and resources.

## Features

- **Home Page**: Professional landing page with hero section
- **Services Section**: Showcase of integrated services:
  - Job Finder
  - Code Tracker
  - AI Resume Analyzer
  - AI Mock Interview System (Coming Soon)
- **Authentication System**:
  - User signup with form validation
  - Secure login with password hashing
  - Remember me functionality with LocalStorage
  - JWT token-based authentication
- **User Profiles**: Backend storage of user credentials
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI**: Modern, clean, and business-appropriate design

## Tech Stack

### Frontend
- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript (ES6+)

### Backend
- Node.js with Express.js
- SQLite3 for database
- bcryptjs for password hashing
- JWT for authentication
- CORS enabled

## Project Structure

```
CareerCraft/
├── public/
│   ├── index.html           # Home page
│   ├── login.html           # Login page
│   ├── signup.html          # Signup page
│   ├── css/
│   │   └── style.css        # Global styles
│   ├── js/
│   │   ├── main.js          # Main page functionality
│   │   ├── login.js         # Login logic with remember me
│   │   └── signup.js        # Signup logic
│   └── images/              # Image assets folder
├── config/
│   ├── database.js          # SQLite database setup
│   └── jwt.js               # JWT token management
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   └── auth.js              # Authentication middleware
├── routes/
│   └── auth.js              # Authentication routes
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
└── README.md               # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Navigate to the project directory**:
```bash
cd /Users/vaibhavtyagi/Desktop/finalcap/CareerCraft
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the server**:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

4. **Access the website**:
Open your browser and navigate to `http://localhost:5000`

## API Endpoints

### Authentication

- **POST /api/auth/signup**
  - Request body: `{ fullname, email, password }`
  - Response: User data with JWT token

- **POST /api/auth/login**
  - Request body: `{ email, password }`
  - Response: User data with JWT token

- **GET /api/auth/verify**
  - Headers: `Authorization: Bearer <token>`
  - Response: Verified user data

## Features Explained

### Remember Me Functionality
- When users check "Remember me" during login, their email is saved in localStorage
- Data is stored with a timestamp and expires after 7 days
- Secure: Passwords are NEVER stored in localStorage
- On next visit, the email field is pre-filled automatically

### Password Security
- Passwords are hashed using bcryptjs with 10 salt rounds
- Raw passwords are never stored in the database
- Password verification uses secure comparison

### Audit Logging
- All login and signup actions are logged in the audit_log table
- Helps track user activity and security

## Services Integration

The website integrates with these external services:

1. **Job Finder**: https://job-finder-murex-zeta.vercel.app/
2. **Code Tracker**: https://coding-tracker-pearl.vercel.app/
3. **AI Resume Analyzer**: https://resanalyser.vercel.app/
4. **AI Mock Interview**: https://ai-mock-interview-ntzn.onrender.com/

## Customization Guide

### Update Author Information
Edit the team section in `index.html` to add team members:

```html
<div class="team-member">
    <div class="team-member-image">👤</div>
    <div class="team-member-info">
        <h4>Author Name</h4>
        <p>Role/Title</p>
        <p class="bio">Bio information</p>
    </div>
</div>
```

### Update Service Links
Edit service card links in `public/index.html` to update external service URLs.

### Change Colors
Modify CSS variables in `public/css/style.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #00d4ff;
    --accent-color: #ff6b35;
    /* ... */
}
```

## Deployment

### Deploying to Production

1. **Update .env file** with production values:
```
PORT=5000
JWT_SECRET=your_very_secure_secret_key
NODE_ENV=production
```

2. **Use a process manager** like PM2:
```bash
npm install -g pm2
pm2 start server.js --name "careercraft"
```

3. **Deploy to services** like Heroku, Render, or AWS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

- Always use HTTPS in production
- Change the default JWT_SECRET in .env
- Use environment variables for sensitive data
- Implement rate limiting for login attempts
- Add CSRF protection for form submissions
- Consider implementing 2FA for enhanced security

## Future Enhancements

- [ ] Add email verification for signup
- [ ] Implement password reset functionality
- [ ] Add user profile management
- [ ] Integrate Google/GitHub OAuth
- [ ] Add payment integration for premium features
- [ ] Implement real-time notifications
- [ ] Add user dashboard with analytics

## Support

For issues or questions, please reach out to: info@careercraft.io

---

**Created**: January 2026
**Version**: 1.0.0
**Status**: Active Development
