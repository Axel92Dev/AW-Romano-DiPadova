var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session')

var routes = require('./routes');

var app = express();

//setup view engine as handlebars and set path to "views"
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Implement CSP with Helmet, add the Header
//app.use(helmet.csp({
//  defaultSrc: ["'self'"],
//  //- Allow analytics
//  scriptSrc: ['*.google-analytics.com'],
//  //Allow inline css
//  styleSrc: ["'unsafe-inline'"],
//  imgSrc: ['*'],
//  connectSrc: ["'none'"],
//  fontSrc: [],
//  objectSrc: [],
//  mediaSrc: [],
//  frameSrc: []
//}));

// Implement X-XSS-Protection
app.use(helmet.xssFilter());


// Hide X-Powered-By Express to mask tech stack
app.use(helmet.hidePoweredBy({setTo: 'the Force'}));

app.use(session({
  secret: 'ApplicazioniWebSECRET',
  resave: false,
  saveUninitialized: true
}));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
