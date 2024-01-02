const express = require('express');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
var cookieParser = require('cookie-parser');
const connectDb = require('./src/config/db');
const userRoute = require('./src/routes/user.route');
const authRoute = require('./src/routes/auth.route');
const supportRouter = require('./src/routes/support.route');
const postRouter = require('./src/routes/post.route');
const connectCloudinary = require('./src/middleware/upload');
const app = express();

const support = require('./utils/support');
app.use(express.json());
dotenv.config();
//Connect Database
connectDb();

//cookie-parser
app.use(cookieParser());

//Routes
app.use('/user', userRoute);
app.use('/', authRoute);
app.use('/chat-support', supportRouter);
app.use('/post', postRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is up and running on PORT:${PORT}`);
});

support.connectChat();
