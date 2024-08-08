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
        type: String, // Ensure this aligns with how you format and store time
        default: '00:00:00',
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'ended'],
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);




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
//     },
//     status: {
//         type: String,
//         default: 'pending',
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('Task', taskSchema);