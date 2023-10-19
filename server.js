const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars').engine;

const port = 3000;
app.use('/styling', express.static(__dirname + '/client/styling'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/client/views/'));
app.engine( 'hbs', hbs( { 
  extname: 'hbs', 
  defaultLayout: 'layout',
} ) );
app.set('view engine', 'hbs');
app.use(express.static('client'));



const indexRouter = require('./routes/indexRoutes')
const matchRouter = require('./routes/indexRoutes')


app.use('/', indexRouter);
app.use('/match', matchRouter);


app.listen(port, () => console.log(`Server listening to port ${port}`));
 