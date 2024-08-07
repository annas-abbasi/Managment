const express = require('express');
const router = express.Router();
const { RegisterUser, LoginUser, ProfileUser, LogoutUser, createTask, getAllTasks, getRegisterUser, endTask, updateTaskApproval, updateTaskStatus } = require('../Controllers/user');

router.route('/register').post(RegisterUser);
router.route('/login').post(LoginUser);
router.route('/profile').get(ProfileUser);
router.route('/logout').post(LogoutUser);
router.post('/assign-task', createTask);
router.get('/tasks', getAllTasks);
router.get('/registered-user', getRegisterUser);
router.put('/end-task', endTask);
router.post('/end-task', endTask);
router.post('/update-task-status', updateTaskStatus);

module.exports = router; 