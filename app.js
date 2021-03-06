const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const session = require('express-session');


const app           = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');

const usersController   = require('./controllers/users');
const authController   = require('./controllers/auth');
const indexController = require('./controllers/index');
const photosController = require('./controllers/photos');
const homeController = require('./controllers/home');

// var MongoClient = require('mongodb').MongoClient;


// var uri = "mongodb+srv://user:FouFouLove1@cluster0-apmqh.gcp.mongodb.net/test?retryWrites=true";
// MongoClient.connect(uri, function(err, client) {
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });

// set up CSS
app.use(express.static('public'));

// set Up our session
app.use(session({
  secret: 't98ieaious;apfa9oiaidfhnidfaiai3u72o3948872ijoaifkn',
  resave: false, // only save when the session object has been modified
  saveUninitialized: false // useful for login sessions, we only want to to save when we modify
  // session
}));

const User = require('./models/userSeeds');

// Set up middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use((req,res,next)=>{
  if (req.session.loggedIn === true) {

  console.log(req.session); } else {
    req.session.loggedIn = false;
    req.session.userName = false;
    console.log(req.session);
  }
  console.log(req.session);
  next();
})

// set up controller routes
app.use('/auth', authController);
app.use('/users', usersController);
app.use('/index', indexController);
app.use('/photos', photosController);
app.use('/home', homeController);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    users: User[0]
  });
});
// require db
require('./db/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
