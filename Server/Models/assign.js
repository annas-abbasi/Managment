// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     task: {
//         type: String,
//         required: true,
//     },
//     time: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'approved', 'not-approved'],
//         default: 'pending'
//     },
// }, { timestamps: true });

// module.exports = mongoose.model('Task', taskSchema);





const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending', // can be 'approved', 'not-approved', or 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);




// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     task: {
//         type: String,
//         required: true,
//     },
//     time: {
//         type: String,
//         required: true,
//     },
// }, { timestamps: true });

// module.exports = mongoose.model('Task', taskSchema);