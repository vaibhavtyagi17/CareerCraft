# 🚀 CareerCraft - How to Run

## Step-by-Step Instructions

### Step 1: Open Terminal
Open your terminal/command prompt.

### Step 2: Navigate to Project
```bash
cd /Users/vaibhavtyagi/Desktop/finalcap/CareerCraft
```

### Step 3: Install Dependencies (First Time Only)
```bash
npm install
```

This will download and install all required packages. This may take 1-2 minutes.

### Step 4: Start the Server
```bash
npm start
```

You should see:
```
CareerCraft Server is running on port 5000
Visit http://localhost:5000 to access the application
Connected to SQLite database
Users table ready
Sessions table ready
Audit log table ready
```

### Step 5: Open in Browser
Open your web browser and go to: **http://localhost:5000**

---

## ✨ What You'll See

### Home Page (index.html)
- Professional hero section with "Get Started" button
- 4 service cards (Job Finder, Code Tracker, Resume Analyzer, Mock Interview)
- About Us section with company info
- Team members placeholder
- Beautiful footer with links

### Navigation
- Click "Home", "Services", "About Us" to scroll to sections
- Click "Login" to go to login page

### Sign Up (New Users)
1. Click "Login" button in navbar → Click "Create one here" link
2. Fill in: Full Name, Email, Password, Confirm Password
3. Click "Create Account"
4. Success! You'll be logged in automatically

### Login (Existing Users)
1. Go to Login page via navbar
2. Enter Email and Password
3. **Optional**: Check "Remember me on this device" to save email
4. Click "Sign In"

### Remember Me Feature
- If you checked "Remember me", your email will be saved
- Next time you visit login page, email field will be auto-filled
- Password is NEVER saved (for security)
- Remember data expires after 7 days

### Services Links
- Click on any service card to visit the external service
- Job Finder, Code Tracker, Resume Analyzer are fully functional
- Mock Interview system link will be updated when deployed

---

## 🔐 Test Accounts

You can create your own, or test with these:

**Example Account 1:**
- Email: test@careercraft.com
- Password: Test@123456

(Create this by going through signup)

---

## 💾 Data Storage

All user data is stored locally in:
```
/Users/vaibhavtyagi/Desktop/finalcap/CareerCraft/database/careercraft.db
```

This SQLite database contains:
- User credentials (name, email, hashed password)
- Login sessions
- Audit logs

---

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal to stop the server.

---

## ⚡ Development Mode (Auto-Reload)

To automatically reload when you make code changes:
```bash
npm run dev
```

This uses nodemon to watch for file changes and restart the server automatically.

---

## 🔧 Troubleshooting

### Port Already in Use
If you get "Port 5000 already in use":
1. Edit `.env` file
2. Change `PORT=5000` to `PORT=5001` (or another number)
3. Restart server
4. Visit `http://localhost:5001`

### npm install Fails
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Database Issues
```bash
rm -rf database/
npm start
```
This recreates the database fresh.

### Can't Access Website
- Make sure server is running (check terminal)
- Use correct URL: http://localhost:5000
- Check that port 5000 is not blocked by firewall
- Try a different port in .env if needed

---

## 📱 Access from Other Devices

To access from another device on the same network:

1. Find your computer's IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. On other device, use:
   ```
   http://YOUR_IP:5000
   (e.g., http://192.168.1.100:5000)
   ```

---

## 🌐 Features to Test

### 1. Home Page
- [ ] View hero section
- [ ] Click service cards
- [ ] Click "Get Started" button
- [ ] Scroll through sections
- [ ] Click footer links

### 2. Sign Up
- [ ] Go to signup page
- [ ] Fill in all fields
- [ ] Test validation (short password, invalid email)
- [ ] Create account
- [ ] Check if logged in (email appears in navbar)

### 3. Login
- [ ] Logout first (click email in navbar)
- [ ] Go to login page
- [ ] Enter correct credentials
- [ ] Test remember me - check the box
- [ ] Logout and refresh
- [ ] Email should still be filled

### 4. Services
- [ ] Click each service link
- [ ] All should open in new tab
- [ ] Verify links are correct

### 5. Responsiveness
- [ ] Open in browser developer tools (F12)
- [ ] Test on mobile view (375px width)
- [ ] Test on tablet view (768px width)
- [ ] Everything should work correctly

---

## 📊 Monitor Database

View user data stored in database:

The database location:
```
/Users/vaibhavtyagi/Desktop/finalcap/CareerCraft/database/careercraft.db
```

You can view it with SQLite tools like:
- SQLite Browser (GUI tool)
- DBeaver
- VS Code Extension "SQLite"

---

## 📝 Important Files to Know

- **Main Server**: `server.js`
- **Database Setup**: `config/database.js`
- **Authentication Logic**: `controllers/authController.js`
- **Home Page**: `public/index.html`
- **Login Page**: `public/login.html`
- **Styles**: `public/css/style.css`
- **Frontend Logic**: `public/js/main.js`, `public/js/login.js`

---

## 🔐 Security

✅ All passwords are securely hashed
✅ No passwords stored in remember me
✅ JWT tokens for secure sessions
✅ Input validation on all forms
✅ SQL injection protection

---

## 📞 Quick Help

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| Port 5000 in use | Change PORT in .env |
| Database error | Delete database/ folder and restart |
| Pages not loading | Check if server is running |
| Styles not loading | Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac) |

---

## 🎯 Next Steps

1. ✅ Run the server
2. ✅ Test all features
3. ✅ Add team member photos and info (when ready)
4. ✅ Add AI Mock Interview link (when deployed)
5. ✅ Deploy to production (Vercel, Heroku, etc.)

---

## 📚 Documentation Files

- **README.md** - Full documentation
- **QUICKSTART.md** - Quick start guide
- **PROJECT_STRUCTURE.md** - File structure and database
- **HOW_TO_RUN.md** - This file

---

**Ready to run CareerCraft? Start with Step 1 above! 🚀**

Last Updated: January 26, 2026
