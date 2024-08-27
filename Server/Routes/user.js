const express = require('express');
const router = express.Router();
// const { upload } = require('../middleware/uploadMiddleware'); // Middleware for handling file uploads
// const { authenticate } = require('../middleware/authMiddleware'); // Middleware for authentication

const { RegisterUser, LoginUser, ProfileUser, LogoutUser, createTask, getAllTasks, getRegisterUser, endTask, updateTask, updateProfileImage, getProfileImage } = require('../Controllers/user');
const { authenticate } = require('../authMiddleware');
const { upload } = require('../uploadMiddleware');

router.route('/register').post(RegisterUser);
router.route('/login').post(LoginUser);
router.route('/profile').get(ProfileUser);
router.route('/logout').post(LogoutUser);

router.post('/assign-task', createTask);
router.get('/tasks', getAllTasks);
router.put('/tasks/:id/status', updateTask);
router.post('/end-task', endTask);
router.put('/end-task', endTask);
router.get('/registered-user', getRegisterUser);

router.post('/update-profile-image', authenticate, upload.single('image'), updateProfileImage);

// Route for getting profile image
router.get('/profile-image', authenticate, getProfileImage);

module.exports = router;