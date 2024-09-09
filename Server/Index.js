require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./DB/connect');
// const registerUser = require('./Routes/user');
const profileRoutes = require('./Routes/userAuth');
const routes = require('./Routes/user');

const http = require('http');
const server = http.createServer(app);

app.use(cors({
    origin: ['https://managment-weld.vercel.app', 'http://localhost:3000',],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(routes)
app.use('/api', profileRoutes);
app.use('/routes', routes);
app.get('/', (req, res) => {
    res.send('Server is Listening...')
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error('ErrorHandler Middleware:', err.stack);
    console.log('This is Test Error:', err.message)
    res.status(statusCode).json({
        success: false,
        message,
    });
});

const port = process.env.PORT || 3007;
const Start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        server.listen(port, (req, res) => {
            console.log(`Port is listening on the Port${port}`);
        })
    } catch (error) {
        console.log('Error in the Server', error)
    }
}
Start();