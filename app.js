//dependencies
const express = require('express');
const morgan = require('morgan');
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

//global variables
const PORT = process.env.APPLICATION_PORT || 4000;


app.get('/', (req, res) => {
    res.render('pages/auth/signup');
})

//application listener
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});