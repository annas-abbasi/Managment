require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const registerUser = require('./Routes/user')
const connectDB = require('./DB/connect')
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['https://managment-weld.vercel.app', 'http://localhost:3000',],
    credentials: true,
}));

app.use(registerUser)

const port = process.env.PORT || 3007;

const Start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, (req, res) => {
            console.log(`Port is listening on the Port${port}`);
        })
    } catch (error) {
        console.log('Error in the Server', error)
    }
}

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
    next();
})

Start();