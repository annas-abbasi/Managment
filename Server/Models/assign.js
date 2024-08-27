const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    names: {
        type: [String],
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
        default: '00:00:00',
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'ended', 'Approved', 'Not Approved'],
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
//         default: '00:00:00',
//     },
//     status: {
//         type: String,
//         default: 'pending',
//         enum: ['pending', 'ended', 'Approved', 'Not Approved'],
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('Task', taskSchema);