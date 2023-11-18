require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/category');
const adRoutes = require('./routes/ad');
const commentRoutes = require('./routes/comment');
const listEndpoints = require('express-list-endpoints');

const app = express();
const cors = require('cors');

const corsOptions = {
  origin: '*', // or '*' for all origins
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/categories', categoryRoutes);
app.use('/', adRoutes);
app.use('/categories/:id/ads/:adid/comments', commentRoutes);

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const refreshRoute = require('./routes/refresh');
const checkDuplicateEmail = require('./middleware/checkDuplicateEmail');
const {
  validateRegisterFields,
  validateLoginFields,
} = require('./validations/validateAuthFields');

app.use(
  '/register',
  validateRegisterFields,
  checkDuplicateEmail,
  registerRoute
);
app.use('/login', validateLoginFields, loginRoute);
app.use('/refresh', refreshRoute);

// console.log(listEndpoints(app));

app.all('*', (req, res, next) => {
  // Create a new error object
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 404; // Set a custom HTTP status
  next(err); // Pass the error object to the next middleware function
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => console.log('Server is running on port 3000'));

module.exports = app;
