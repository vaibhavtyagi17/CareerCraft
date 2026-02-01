const bcrypt = require('bcryptjs');
const { getDatabase } = require('../config/database');
const { generateToken } = require('../config/jwt');

// ===========================
// SIGNUP CONTROLLER
// ===========================

exports.signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Validation
        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        const db = getDatabase();

        // Check if user already exists
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Database error'
                });
            }

            if (user) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already registered'
                });
            }

            // Hash password
            try {
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create user
                db.run(
                    'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)',
                    [fullname, email, hashedPassword],
                    function(err) {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: 'Error creating user'
                            });
                        }

                        const userId = this.lastID;
                        const token = generateToken(userId, email);

                        // Log audit
                        db.run(
                            'INSERT INTO audit_log (user_id, action, details) VALUES (?, ?, ?)',
                            [userId, 'SIGNUP', `User ${email} signed up`]
                        );

                        res.status(201).json({
                            success: true,
                            message: 'Account created successfully',
                            userId: userId,
                            token: token,
                            user: {
                                id: userId,
                                email: email,
                                fullname: fullname
                            }
                        });
                    }
                );
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: 'Error processing password'
                });
            }
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// ===========================
// LOGIN CONTROLLER
// ===========================

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const db = getDatabase();

        // Find user
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Database error'
                });
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Verify password
            try {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid email or password'
                    });
                }

                const token = generateToken(user.id, user.email);

                // Log audit
                db.run(
                    'INSERT INTO audit_log (user_id, action, details) VALUES (?, ?, ?)',
                    [user.id, 'LOGIN', `User ${email} logged in`]
                );

                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    userId: user.id,
                    token: token,
                    user: {
                        id: user.id,
                        email: user.email,
                        fullname: user.fullname
                    }
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: 'Error verifying password'
                });
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// ===========================
// VERIFY TOKEN
// ===========================

exports.verifyToken = (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const { verifyToken } = require('../config/jwt');
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Token is valid',
            user: decoded
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
