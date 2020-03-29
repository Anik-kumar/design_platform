const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const expSession = require('express-session');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

// import services
const mongoService = require('./services/MongoService');
const authService = require('./services/AuthService');
const loggingService = require('./services/LoggingService');

// import routes
const interceptRequest = require('./routes/InterceptRequest');
const routes = require('./routes/routes');
const authRoutes = require('./routes/AuthRouter');

app.use(bodyParser.urlencoded({extended: false}));


mongoose.connect('mongodb://localhost:27017/redApp', {useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		console.log('Database is connected.');
	})
	.catch(error => {
		console.error(`Error Connecting Database. ${error}`);
	});

// middlewares
app.use(express.json());

// route middlewares
app.use('/auth/', authRoutes);
app.use('/', routes);





const port = process.env.PORT | 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});