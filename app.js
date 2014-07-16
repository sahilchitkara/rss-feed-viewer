/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var User = require('./model/users');
var user = require('./routes/user');
var feed = require('./routes/feed');
var http = require('http');
var path = require('path')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
app = express();

// all environments
app.set('port',process.env.PORT || 8080);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.bodyParser());
app.use(express.session());
app.use(passport.initialize());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(app.router);
app.use(express.static(path.join(__dirname,'public')));


// development only
if('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// db connection
if(app.get('env')=='production'){
  mongoose.connect('prodMongoUrl',function(err) {
    if(err) throw err;
    console.log('db connected: ' + 'mongo rssFeed');
  });
}else{
  mongoose.connect('mongodb://localhost/rssFeed',function(err) {
    if(err) throw err;
    console.log('db connected: ' + 'rssFeed');
  });
}

//stratergies
passport.use(new LocalStrategy(
    function(username, password, done) {
        process.nextTick(function () {
            User.findOne({email: username}, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
));

//routes url
app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/signup',routes.signup);
app.post('/rss/add',feed.save);
app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),function(req,res){
        res.redirect('/login');
    }
);
app.post('/signup',user.create);
app.get('/logout', user.logout);


//server listen
var server = http.createServer(app).listen(app.get('port'),function() {
  console.log('Express server listening on port ' + app.get('port'));
});

//passport user serialize and deserialize
passport.serializeUser(function(user,done) {
  done(null,user);
});

passport.deserializeUser(function(user,done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});