const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('The mongoose is connected succesfully...')
    } catch (error) {
        console.log('DB Connect', error)
    }
};

module.exports = connectDB; 