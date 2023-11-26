const express = require('express');
const cors = require('cors');
// import userRouter
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const forgotPasswordRouter = require('./controllers/forgotPassword');
const resetPasswordRouter = require('./controllers/resetPassword');

// create a new express app
const app = express();

// use the cors middleware
app.use(cors());
// use the express.json middleware
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.responseLogger);

// define the endpoints here
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/notes', notesRouter);
app.use('/api/forgot-password', forgotPasswordRouter);
app.use('/api/reset-password', resetPasswordRouter);

// export the app
module.exports = app;