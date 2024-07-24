const express = require('express');
const router = express.Router();
const { RegisterUser, LoginUser, ProfileUser, LogoutUser, createTask, getAllTasks } = require('../Controllers/user');

router.route('/register').post(RegisterUser);
router.route('/login').post(LoginUser);
router.route('/profile').get(ProfileUser);
router.route('/logout').post(LogoutUser);
router.post('/assign-task', createTask);
router.get('/tasks', getAllTasks);

module.exports = router;