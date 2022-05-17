const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
// const handlebars = require('express-handlebars');
const hbs = require('express-handlebars');
const SortMiddleWares = require('./app/middlewares/SortMiddleWares');

const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
db.connect();




app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));
app.use(SortMiddleWares);

// var hbs = handlebars.create({
//   helpers: {
//       sayHello: function () { alert("Hello World") },
//       getStringifiedJson: function (value) {
//           return JSON.stringify(value);
//       },
//   },
//   defaultLayout: 'main',
//   partialsDir: ['views/partials/'],
//   extname:'.hbs',
//   // layoutsDir: path.join(__dirname, 'views/layouts/'),
//   // partialsDir  : [
//   //     //  path to your partials
//   //     path.join(__dirname, 'views/partials/'),
//   // ]

// });

app.use(morgan('combined'));
// hbs.engine
// app.engine('hbs',hbs.engine);
app.engine(
    'hbs',
    hbs.create({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutDir: __dirname + '/views/layouts',
        helpers: require('./helpers/handlebars'),
    }).engine,
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resoures','views'));
console.log('PATH: ', path.join(__dirname, 'views'));

//route innit
route(app);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
