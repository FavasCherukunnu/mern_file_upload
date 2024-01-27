const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors'); // Import cors module
const path = require('path');
require('dotenv').config();

app.use(cors());
// Set up the storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Set unique filenames
    },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

const port = process.env.PORT || 3002

// Simple route to test the server
app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!');
});

// Define a route for handling file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = `/uploads/${req.file.filename}`;
    res.json({ success: true, file: filePath });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
