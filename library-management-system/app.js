const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

// Create database connection
require('./db/connect');

// Create Express app
const app = express();

// Use session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
}));

// Importing routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const usersRouter = require('./routes/users');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const bookRoute = require('./routes/book');
const booksRoute = require('./routes/books');
const reservationRoute = require('./routes/reservation');
const reservationsRoute = require('./routes/reservations');
const borrowRoute = require('./routes/borrow');
const borrowsRoute = require('./routes/borrows');
const testRoute = require('./routes/test');



// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Adding misc. middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Adding routes as middleware to handle requests
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/book', bookRoute);
app.use('/books', booksRoute);
app.use('/reservation', reservationRoute);
app.use('/reservations', reservationsRoute);
app.use('/borrow', borrowRoute);
app.use('/borrows', borrowsRoute);
app.use('/test', testRoute);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: 'Oh no!'});
});

module.exports = app;
