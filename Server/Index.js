require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const registerUser = require('./Routes/user')
const connectDB = require('./DB/connect')
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000', 'https://managment-weld.vercel.app/'],
    credentials: true,
}));

app.use(registerUser)

app.get('/test', (req, res) => {
    res.send('Hello Server from the address')
})

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
Start();