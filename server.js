const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

// import routes
const routes = require('./routes/routes');
const authRoutes = require('./routes/authRoutes');

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