const express = require('express');
const router = express.Router();

const { RegisterUser, LoginUser, ProfileUser, LogoutUser, createTask, getAllTasks, getRegisterUser, endTask, updateTask, updateProfileImage, deleteTask, personDetails, getPersonDetails, updateTaskById } = require('../Controllers/user');
const { sendMessage, getMessages } = require('../Controllers/userMsg');

const multer = require('multer');

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
router.put('/userDetails/:userId', personDetails);
router.get('/userDetails', getPersonDetails);

// ROUTE FOR MESSAGE CHAT
router.post('/send-message', sendMessage);
// Route to get messages between two users
router.get('/messages/:userId1/:userId2', getMessages);
router.delete('/delete/:taskId', deleteTask);

router.put('/tasks/:userId', updateTaskById);


// USER PROFILE IMAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage });

router.post('/user/:id/profile-image', upload.single("profileImage"), updateProfileImage)

module.exports = router;