require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const registerUser = require('./Routes/user')
const profileRoutes = require('./Routes/user');
const connectDB = require('./DB/connect')
const cookieParser = require('cookie-parser');

const socketIo = require('socket.io')
const http = require('http')
const server = http.createServer(app)

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
})

app.use(cors({
    origin: ['https://managment-weld.vercel.app', 'http://localhost:3000',],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// io.on('connection', (socket) => {
//     // console.log('A user connected:', socket.id);

//     socket.on('register', (userId) => {
//         io.emit("register", userId);
//     });

//     socket.on('chat', (message) => {
//         // Emit the message to the intended recipient or all users
//         io.emit('chat', message); // Broadcast to all users, modify to send to a specific user
//     });

//     socket.on("disconnect", () => {
//         console.log("Disconnected");
//     });
// });

// FOR THE PRIVATE MESSAGE
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Store connected users
    socket.on('register', (userId) => {
        socket.userId = userId; // Attach the userId to the socket object
        socket.join(userId); // Join the room named after the userId
        console.log(`User registered: ${userId}`);
    });

    // Handle incoming messages
    socket.on('chat', (message) => {
        const { receiver, content } = message; // Extract receiver ID and content
        io.to(receiver).emit('chat', message); // Emit message to specific user
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


app.use(registerUser)
app.use('/api', profileRoutes);
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

app.get('/', (req, res) => {
    res.send('Server is Listening...')
})

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




// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error'
//     res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message
//     })
//     next();
// })
