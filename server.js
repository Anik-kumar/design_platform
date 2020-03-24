const express = require('express');
const app = express();
const mongoose = require('mongoose');

const route = require('./routes/route');

mongoose.connect('mongodb://localhost:27017/redApp', {useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		console.log('Database is connected.');
	})
	.catch(error => {
		console.error(`Error Connecting Database. ${error}`);
	});


app.get('/', (req, res)=>{
	res.send('Hello, Welcome To Home Page');
});




const PORT = process.env.PORT | 3000;

app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`);
});