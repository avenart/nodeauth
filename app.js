require('dotenv').config({ path: '.env'});
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const errorHandler = require('./middlewares/errors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.engine('hbs', exphbs({
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function(req, res){
	res.render('home');
});

const models = require('./models');

models.sequelize.sync().then(function() {
     console.log('Database looks fine...')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

const routes = require('./routes/index');
const authRoutes = require('./routes/auth')(app, passport);
app.use('/', routes);
app.use(errorHandler.notFound);
app.use(errorHandler.catchErrors);

require('./config/passport/passport')(passport, models.user);

module.exports = app;