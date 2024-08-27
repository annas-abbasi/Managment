const multer = require('multer');
const path = require('path');

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name
    }
});

// Initialize Multer
const upload = multer({ storage });

module.exports = { upload };
