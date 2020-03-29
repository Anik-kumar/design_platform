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
const routes = require('./routes/routes');
const authRoutes = require('./routes/AuthRouter');

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
app.use('/', routes);
app.use('/auth/', authRoutes);


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
	res.render('error');
});

module.exports = app;
