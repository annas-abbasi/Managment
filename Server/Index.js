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
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST'],
    }
})

app.use(cors({
    origin: ['https://managment-weld.vercel.app', 'http://localhost:3000',],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

io.on("connection", (socket) => {
    console.log('New Client Connected')
    socket.on('messageUser', (message) => {
        io.emit('message', message)
    })

    socket.on('discount', () => {
        console.log('Client Disconnected')
    })
})

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









// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors')
// const registerUser = require('./Routes/user')
// const profileRoutes = require('./Routes/user');
// const connectDB = require('./DB/connect')
// const cookieParser = require('cookie-parser');

// const socketIo = require('socket.io')
// const http = require('http')
// const server = http.createServer(app)

// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin: ['https://managment-weld.vercel.app', 'http://localhost:3000',],
//     credentials: true,
// }));

// app.use(registerUser)
// app.use('/api', profileRoutes);

// const port = process.env.PORT || 3007;

// const Start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI);
//         app.listen(port, (req, res) => {
//             console.log(`Port is listening on the Port${port}`);
//         })
//     } catch (error) {
//         console.log('Error in the Server', error)
//     }
// }

// // app.use((err, req, res, next) => {
// //     const statusCode = err.statusCode || 500;
// //     const message = err.message || 'Internal Server Error'
// //     res.status(statusCode).json({
// //         success: false,
// //         statusCode,
// //         message
// //     })
// //     next();
// // })

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';

//     console.error('ErrorHandler Middleware:', err.stack);
//     console.log('This is Test Error:', err.message)
//     res.status(statusCode).json({
//         success: false,
//         message,
//     });
// });

// Start();