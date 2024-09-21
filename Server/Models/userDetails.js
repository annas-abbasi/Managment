// const mongoose = require('mongoose');

// const userDetails = mongoose.Schema({
//     phoneNo: Number,
//     Gender: String,
//     Birthday: String,
//     Upwork: String,
//     Slack: String,
//     Linkedin: String,
// })

// module.exports = mongoose.model('userDetail', userDetails)





//UserDetails.js
const mongoose = require('mongoose');

const userDetailsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phoneNo: Number,
    Gender: String,
    Birthday: String,
    Upwork: String,
    Slack: String,
    Linkedin: String,
});

module.exports = mongoose.model('UserDetail', userDetailsSchema);
