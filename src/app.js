const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const expSession = require('express-session');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// import services
const mongoService = require('./services/MongoService');
const authService = require('./services/AuthService');
const loggingService = require('./services/LoggingService');

// import routes
const interceptRequest = require('./routes/InterceptRequest');
const indexRoutes = require('./routes/IndexRouter');
const authenticationRouter = require('./routes/AuthenticationRouter');
const authorizationRouter = require('./routes/AuthorizationRouter');
const userRoutes = require('./routes/UserRouter');
const emailRouter = require('./routes/EmailRouter');
const filesRouter = require('./routes/FilesRouter');
const tokenRouter = require('./routes/TokenRouter');
const designRouter = require('./routes/DesignRouter');

const ConfigLoader = require('./config/ConfigLoader');
const config = new ConfigLoader();

const app = express();
const port = config.get('appPort') || 4321;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(helmet());

app.use(expSession({
	secret: 'messageSectet',
	resave: false,
	saveUninitialized: true,
	store: authService.getSessionStore()
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(interceptRequest);

// route middlewares
app.use('/api/auth', authenticationRouter);
app.use('/api/authorize', authorizationRouter);
app.use('/api/user', userRoutes);
app.use('/api/email', emailRouter);
app.use('/api/files', filesRouter);
app.use('/api/token', tokenRouter);
app.use('/api/design', designRouter);


app.use('/', indexRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// Initialize Databases
mongoService.initialize();
loggingService.initialize();
// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	if (err) {
		console.log(err);
	}
	res.send("Internal error, Please try again.");
});

module.exports = app;
