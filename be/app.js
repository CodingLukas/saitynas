require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/category');
const adRoutes = require('./routes/ad');
const commentRoutes = require('./routes/comment');
const listEndpoints = require('express-list-endpoints');

const app = express();

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

app.listen(3000, () => console.log('Server is running on port 3000'));

module.exports = app;
