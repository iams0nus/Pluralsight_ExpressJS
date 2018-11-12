const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app'); // set DEBUG=app & node app.js -- run this command to enable debug mode
const morgan = require('morgan'); // gives us details of the requests to the server
const path = require('path'); // gives us functions to join paths
const bodyParser = require('body-parser'); // parses body of post requests and puts into req.body
const passport = require('passport'); // used for login and logout
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');// used to store session data

const port = process.env.PORT || 3000;
const app = express();

const nav = [{
  link: '/books',
  text: 'Books'
},
{
  link: '/authors',
  text: 'Authors'
}
];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use(morgan('tiny')); // only status code in console
app.use(bodyParser.json()); // use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // use cookie parser
app.use(expressSession({ secret: 'library' })); // use express session

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, 'public'))); // serves static content inside public folder
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))); // fallback folder for static content
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));// send the html file
  // res.render("index", {
  // "title": "My Title", "header": "My Header", "subheader": "My Sub", "list": ["a", "b"]
  // });//render the pug template with variables
  res.render('index', {
    title: 'Library',
    header: 'Library',
    nav
  }); // render the ejs template with variables
});

app.listen(port, () => {
  debug(`listening at port ${chalk.green(port)}`); // chalking port no to green
});
