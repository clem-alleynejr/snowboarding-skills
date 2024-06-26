var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 
var methodOverride = require('method-override');

require('dotenv').config();

require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var snowboardingSkillsRouter = require('./routes/snowboarding-skills');
var sampleSkillsProgressionRouter = require('./routes/sample-skills-progression');
var resortsAndConditionsRouter = require('./routes/resorts-and-conditions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/snowboarding-skills', snowboardingSkillsRouter);
app.use('/sample-skills-progression', sampleSkillsProgressionRouter);
app.use('/resorts-and-conditions', resortsAndConditionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
