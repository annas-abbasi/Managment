const userSchema = require('../Models/user')
const Task = require('../Models/assign')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error('Some Field is missing')
        }
        const existingUser = await userSchema.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists. Please try a different one OKAY." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const registerPerson = await userSchema.create({ name, email, password: hashedPassword });
        res.status(200).json({ registerPerson });
        console.log({ registerPerson });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const validUser = await userSchema.findOne({ email });
        if (!validUser) {
            return res.status(400).json({ error: "Invalid email or password." });
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid email or password." });
        }
        const token = await jwt.sign({ userId: validUser._id, userEmail: validUser.email, userName: validUser.name }, 'my_secret_Key', { expiresIn: '7d' });
        console.log('Generated Token:', token);
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
        // if (error.name === 'JsonWebTokenError') {
        //     res.status(401).json({ error: 'Invalid token' });
        // } else {
        //     res.status(500).json({ error: 'Server Error' });
        // }
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
}

// const createTask = async (req, res) => {
//     try {
//         const { name, title, task, time } = req.body;
//         const newTask = new Task({ name, title, task, time });
//         await newTask.save();
//         res.status(201).json(newTask);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };


const getRegisterUser = async (req, res) => {
    try {
        const getTask = await userSchema.find();
        res.status(200).json(getTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Testing

const createTask = async (req, res) => {
    try {
        const { name, title, task, time } = req.body;

        // Check if user exists
        const user = await userSchema.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const newTask = new Task({ name, title, task, time });
        await newTask.save();
        res.status(201).json({ newTask });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};












module.exports = { LoginUser, RegisterUser, ProfileUser, LogoutUser, createTask, getAllTasks, getRegisterUser }