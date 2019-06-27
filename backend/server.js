/**
 * HTTP server
 */
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Heroku Deployment
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

/**
 * Initialize mongoose
 */
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

/**
 * Middleware
 */
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Routes
 */
const usersRouter = require('./routes/api/users');
app.use('/api/users', usersRouter);

const doodlesRouter = require('./routes/api/doodles');
app.use('/api/doodles', doodlesRouter);

/**
 * Run Express
 */
app.listen(port, () => console.log(`Server is running on port ${port}`));
