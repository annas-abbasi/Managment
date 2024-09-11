const userSchema = require('../Models/user')
const Task = require('../Models/assign')
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
            return res.status(400).json({ error: "Username not found!" });
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Password is incorrect!" });
        }

        const token = await jwt.sign({ userId: validUser._id, userEmail: validUser.email, userName: validUser.name, profileImage: validUser.profileImage }, 'my_secret_Key', { expiresIn: '7d' });
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
        const { names, title, task, time } = req.body;

        const nameArray = names.split(',').map(name => name.trim());
        const tasks = [];

        for (const name of nameArray) {
            const user = await userSchema.findOne({ name });
            if (!user) {
                return res.status(404).json({ message: `User not found: ${name}` });
            }
            const newTask = new Task({ names: [name], title, task, time });
            await newTask.save();
            tasks.push(newTask);
        }

        res.status(201).json({ message: 'Tasks created successfully', tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        const getTask = await userSchema.find();
        res.status(200).json(getTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const item = await Task.findByIdAndDelete(taskId)
        if (!item) {
            return res.status(404).json({ message: 'Item not found' })
        }
        res.status(200).json({ message: 'Item Deleted Succesfully.', item })
        console.log('This is the deleteId:', item)
    } catch (error) {
        console.log('Error From the Delete Task Controller:', error)
    }

}

// FOR THE IMAGE CHANGE...
// const updateProfileImage = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         // const profileImage = req.file ? req.file.path : null;
//         const profileImage = req.file ? `/uploads/${req.file.filename}` : null;
//         if (!profileImage) {
//             return res.status(400).json({ message: 'No Image is Uploaded' });
//         }
//         const updateUser = await userSchema.findByIdAndUpdate(userId, (profileImage), { new: true })
//         if (!updateUser) {
//             return res.status(404).json({ message: 'User not found' })
//         }
//         res.status(200).json(updateUser);
//         console.log('This is UpdateUser:', updateUser)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

const updateProfileImage = async (req, res) => {
    try {
        const userId = req.params.id;
        const profileImage = req.file ? `/uploads/${req.file.filename}` : null;
        profileImage.trim();
        if (!profileImage) {
            return res.status(400).json({ message: 'No Image is Uploaded' });
        }
        // Update the user with the new profile image
        const updateUser = await userSchema.findByIdAndUpdate(userId, { profileImage }, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updateUser);
        console.log('This is UpdateUser:', updateUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { LoginUser, RegisterUser, ProfileUser, LogoutUser, createTask, getAllTasks, getRegisterUser, endTask, updateTask, updateProfileImage, deleteTask, }