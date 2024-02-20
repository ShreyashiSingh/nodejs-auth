const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const weatherController = require('./controllers/weatherController');

const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());//it takes any json data that comes long with a request and passes into a javascript object for us so that we can use it inside a code
app.use(cookieParser());

// database connection
const dbURI = 'mongodb+srv://shreyashiss2567:0eW2V3xKHaLpXZ6Q@cluster0.fxexqgb.mongodb.net/';
mongoose.connect(dbURI)
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
//const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes); 

app.get('/weather', requireAuth, weatherController.getWeather); // Weather endpoint


