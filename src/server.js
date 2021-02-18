const express = require('express')
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash());

// global variables
app.use((req, res, next) => {
    // example
    res.locals.success_msg = req.flash('success_msg');
    next()
});

// helpers
require('./helpers/hbs')

// routes
app.use(require('./routes/index.routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;