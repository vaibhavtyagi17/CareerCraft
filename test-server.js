console.log('Starting server test...');

// Test all requires
try {
    console.log('Loading modules...');
    require('express');
    require('cors');
    require('dotenv').config();
    require('bcryptjs');
    require('jsonwebtoken');
    require('sqlite3');
    console.log('✓ All modules loaded');
} catch (err) {
    console.error('✗ Module load error:', err.message);
    process.exit(1);
}

// Test database
console.log('\nTesting database...');
const initDb = require('./config/database');
initDb()
    .then(() => {
        console.log('✓ Database initialized');
        
        // Test server startup
        console.log('\nStarting server...');
        const PORT = process.env.PORT || 5000;
        console.log(`PORT from .env: ${PORT}`);
        
        // Create a test server
        const express = require('express');
        const path = require('path');
        const app = express();
        app.use(express.json());
        app.use(express.static(path.join(__dirname, 'public')));
        
        app.get('/', (req, res) => {
            res.send('Server is running!');
        });
        
        const server = app.listen(PORT, () => {
            console.log(`✓ Server listening on port ${PORT}`);
            console.log(`Visit http://localhost:${PORT}`);
            
            setTimeout(() => {
                console.log('\n✓ Server test successful!');
                process.exit(0);
            }, 2000);
        });
        
        server.on('error', (err) => {
            console.error('✗ Server error:', err.message);
            process.exit(1);
        });
    })
    .catch(err => {
        console.error('✗ Database init error:', err.message);
        process.exit(1);
    });
