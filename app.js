const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const emailController = require('./controllers/emailController');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//SET SECURITY HTTP
app.use(helmet());

//BODY PARSER reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
//LIMIT HTTP REQUESTS 
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP. Please try again in an hour.'
})

app.use('/', limiter)

dotenv.config({ path: './config.env' });
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB || process.env.MONGOLAB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB connection successful!'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

//routes 
app.get('/', (req, res, next) => {
    var message
    res.status(200).render('index', {
        message
    });
})
app.route('/').post(emailController.sendNewEmail);


const port = 3000;
app.listen(3000, () => {
    console.log(`Connected to server on port ${port}`);
});

