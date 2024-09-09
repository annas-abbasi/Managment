const express = require('express');
const router = express.Router();
const { RegisterUser, LoginUser, ProfileUser, LogoutUser } = require('../Controllers/userAuth');

router.route('/register').post(RegisterUser);
router.route('/login').post(LoginUser);
router.route('/profile').get(ProfileUser);
router.route('/logout').post(LogoutUser);


module.exports = router;