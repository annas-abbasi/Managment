const express = require('express');
const router = express.Router();
const { RegisterUser, LoginUser, ProfileUser, LogoutUser, createTask, getAllTasks, getRegisterUser, endTask, updateTask } = require('../Controllers/user');

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

module.exports = router;