const express = require('express');
const router = express.Router();
// const { upload } = require('../middleware/uploadMiddleware'); // Middleware for handling file uploads
// const { authenticate } = require('../middleware/authMiddleware'); // Middleware for authentication

const { createTask, getAllTasks, getRegisterUser, endTask, updateTask, updateProfileImage, getProfileImage } = require('../Controllers/user');
const { authenticate } = require('../authMiddleware');
const { upload } = require('../uploadMiddleware');
const { sendMessage, getMessages } = require('../Controllers/userMsg');


router.post('/assign-task', createTask);
router.get('/tasks', getAllTasks);
router.put('/tasks/:id/status', updateTask);
router.post('/end-task', endTask);
router.put('/end-task', endTask);
router.get('/registered-user', getRegisterUser);

router.post('/update-profile-image', authenticate, upload.single('image'), updateProfileImage);

// Route for getting profile image
router.get('/profile-image', authenticate, getProfileImage);

// ROUTE FOR MESSAGE CHAT
router.post('/send-message', sendMessage);

// Route to get messages between two users
router.get('/messages/:userId1/:userId2', getMessages);

module.exports = router;