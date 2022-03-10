//dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const {bindUserWithRequest} = require('./middlewares/authMiddleware');
const {getLocalValue} = require('./middlewares/setLocalMiddleware');
require('dotenv').config();

//applications
const app = express();

//save session to the database
const store = new MongoDBStore({
    uri: 'mongodb://localhost/blog_posts',
    collection: 'session',
    expires: 1000*60*60*2,
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4
    }
});

//view engine
app.set('views', 'views');
app.set('view engine', 'ejs');

//middleware
const middleware = [
    morgan('dev'),
    express.urlencoded({extended: true}),
    express.json(),
    express.static('public'),
    session({
        secret: 'blog_post_key',
        store: store,
        resave: false,
        saveUninitialized: false,
    }),
    bindUserWithRequest(),
    getLocalValue()
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
