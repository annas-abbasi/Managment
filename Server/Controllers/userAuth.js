const userSchema = require('../Models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error');
const RegisterUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(errorHandler(400, 'Fields are missing!'))
        }
        const existingUser = await userSchema.findOne({ name });
        const existingEmail = await userSchema.findOne({ email });

        if (existingUser) {
            return next(errorHandler(400, 'Username already exists. Please try a different one.'));
        }
        if (existingEmail) {
            return next(errorHandler(400, 'Email already exists. Please try a different one.'));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const registerPerson = await userSchema.create({ name, email, password: hashedPassword });
        res.status(200).json({
            success: true,
            message: 'User registered successfully!',
            registerPerson
        });
    } catch (error) {
        console.log('RegisterUser Error:', error);
        next(error);
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please Fill all the required fields!' });
        }
        const validUser = await userSchema.findOne({ email });
        if (!validUser) {
            return res.status(400).json({ error: "Email not found!" });
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Password is incorrect!" });
        }
        const token = await jwt.sign({ userId: validUser._id, userEmail: validUser.email, }, 'my_secret_Key', { expiresIn: '7d' });
        res.cookie('Token', token, {
            httpOnly: true, secure: true,
            sameSite: 'Strict',
        });
        res.status(200).json({ token, user: validUser.name });
    } catch (error) {
        console.log('Error in the LoginUser Controller.', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const ProfileUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header is missing or improperly formatted' });
        }
        const token = authHeader.split(' ')[1];
        const jwtVerify = await jwt.verify(token, 'my_secret_Key');
        console.log('Token verified successfully:', jwtVerify);
        res.status(200).json({ user: jwtVerify });
    } catch (error) {
        console.log('Error in ProfileUser:', error);
    }
};

const LogoutUser = async (req, res) => {
    try {
        res.clearCookie('Token');
        res.json(true);
    } catch (error) {
        console.log('Error from the Logout Controller', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
module.exports = { LoginUser, RegisterUser, ProfileUser, LogoutUser };