const userSchema = require('../Models/user');
const Task = require('../Models/assign');

// const createTask = async (req, res) => {
//     try {
//         const { names, title, task, time } = req.body;

//         const nameArray = names.split(',').map(name => name.trim());
//         let user = await Task.findOne({ names: { $all: nameArray } });
//         const tasks = [];
//         console.log('This is User', user)
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
            const newTask = new Task({ name, title, task, time });
            await newTask.save();
            tasks.push(newTask);
        }

        res.status(201).json({ message: 'Tasks created successfully', tasks });
        console.log(tasks)
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

module.exports = { createTask, getAllTasks, getRegisterUser, endTask, updateTask, getProfileImage, updateProfileImage }




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
