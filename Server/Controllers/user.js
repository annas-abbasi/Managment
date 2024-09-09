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

        // IN THIS TOKEN I ONLY HAVE TO PROVIDE THE _ID NOT THE OTHER INFO OF USE I CAN GET USER DETAILS ONLY WITH _ID... OR I WILL NOT SECURE THE my_secret_key THEN OTHER USERS CAN HIGHJACK USER COOKIE (ON THE BASE OF THE SECRET_KEY THE USER INFO IS CREATED AND ENCRYPTED OF THE BASICS OF THAT KEY)
        const token = await jwt.sign({ usrId: validUser._id, usrEmail: validUser.email, userName: validUser.name }, 'my_secret_Key', { expiresIn: '7d' });
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
        // console.log('Token verified successfully:', jwtVerify);
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

// const createTask = async (req, res) => {
//     try {
//         const { names, title, task, time } = req.body;

//         const nameArray = names.split(',').map(name => name.trim());
//         let user = await Task.findOne({ names: { $all: nameArray } });
//         const tasks = [];
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }
//         const newTask = new Task({
//             names: nameArray,
//             title,
//             task,
//             time
//         });
//         await newTask.save();
//         // res.status(201).json({ message: 'Task created successfully', newTask });
//         tasks.push(newTask);
//         console.log(tasks)
//         // const newTask = new Task({ name, title, task, time });
//         //             await newTask.save();
//         //             tasks.push(newTask);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//         console.log({ message: error.message })
//     }
// };

// const createTask = async (req, res) => {
//     try {
//         const { names, title, task, time } = req.body;

//         const nameArray = names.split(',').map(name => name.trim());
//         const tasks = [];

//         for (const name of nameArray) {
//             const user = await userSchema.findOne({ name });
//             if (!user) {
//                 return res.status(404).json({ message: `User not found: ${name}` });
//             }
//             const newTask = new Task({ name: nameArray, title, task, time });
//             await newTask.save();
//             tasks.push(newTask);
//         }

//         res.status(201).json({ message: 'Tasks created successfully', tasks });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

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
            // Corrected to use `name` for the current iteration and `names` field for the schema.
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

// @@@@@@@@@@@@@@@@@@
const updateProfileImage = async (req, res, next) => {
    try {
        const userId = req.user.userId; // Assuming user ID is in the token
        const filePath = `/uploads/${req.file.filename}`;

        const user = await userSchema.findByIdAndUpdate(userId, { profileImage: filePath }, { new: true });

        res.status(200).json({ success: true, profileImage: user.profileImage });
    } catch (error) {
        next(error);
    }
};

// Controller function to retrieve the user's profile image
const getProfileImage = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await userSchema.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ success: true, profileImage: user.profileImage });
    } catch (error) {
        next(error);
    }
};
// @@@@@@@@@@@@@@@@@@

module.exports = { LoginUser, RegisterUser, ProfileUser, LogoutUser, createTask, getAllTasks, getRegisterUser, endTask, updateTask, getProfileImage, updateProfileImage }




// THIS CONTROLLER IS SAVING A TASK WITH MULTIPLE USER AT A TIME BUT SHOWS THEM SEPERATLY.
// const createTask = async (req, res) => {
//     try {
//         const { names, title, task, time } = req.body;

//         const nameArray = names.split(',').map(name => name.trim());
//         const tasks = [];

//         for (const name of nameArray) {
//             const user = await userSchema.findOne({ name });
//             if (!user) {
//                 return res.status(404).json({ message: `User not found: ${name}` });
//             }
//             const newTask = new Task({ name, title, task, time });
//             await newTask.save();
//             tasks.push(newTask);
//         }

//         res.status(201).json({ message: 'Tasks created successfully', tasks });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// THIS IS MY FIRST ONE SIMPLE.
// const createTask = async (req, res) => {
//     try {
//         const { name, title, task, time } = req.body;
//         const user = await userSchema.findOne({ name });
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }
//         const newTask = new Task({ name, title, task, time });
//         await newTask.save();
//         res.status(201).json({ newTask });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
