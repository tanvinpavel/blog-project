//dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes');
require('dotenv').config();

//applications
const app = express();

//view engine
app.set('views', 'views');
app.set('view engine', 'ejs');

//middleware
const middleware = [
    morgan('dev'),
    express.urlencoded({extended: true}),
    express.json(),
    express.static('public')
];
app.use(middleware);

//routes
app.use('/auth', authRoute);

//global variables
const PORT = process.env.APPLICATION_PORT || 4000;


app.get('/', (req, res) => {
    res.json('this is home');
})

//Database Connection
mongoose.connect('mongodb://localhost/blog_posts', {useNewUrlParser: true, useUnifiedTopology: true, family: 4})
    .then(()=>{
        console.log('Database Connected Successfully');
        //application listener
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((e)=>{
        console.log('Database Connection Failed '+e);
    })
