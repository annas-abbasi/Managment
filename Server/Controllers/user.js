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
        console.log('This error is from the Controller RegisterUser', error);
        res.status(500).json({ message: "Please Fill all the required Fields!" });
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
            return res.status(400).json({ error: "Username not found!" });
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Password is incorrect!" });
        }
        const token = await jwt.sign({ userId: validUser._id, userEmail: validUser.email, userName: validUser.name }, 'my_secret_Key', { expiresIn: '7d' });
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

const createTask = async (req, res) => {
    try {
        const { name, title, task, time } = req.body;
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

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const endTask = async (req, res) => {
    try {
        const { taskId, time } = req.body;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.time = time;
        task.status = 'ended';
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
        console.log('This is Id:', id)
        console.log('This is the Status:', status)
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.log('error from the updateTask Controller', error)
    }
}

const getRegisterUser = async (req, res) => {
    try {
        const ended = req.query.ended === 'true';
        const getTask = await userSchema.find(ended ? { ended: true } : {});
        res.status(200).json(getTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { LoginUser, RegisterUser, ProfileUser, LogoutUser, createTask, getAllTasks, getRegisterUser, endTask, updateTask }