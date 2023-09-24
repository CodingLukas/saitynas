const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/category');
const adRoutes = require('./routes/ad');
const commentRoutes = require('./routes/comment');

const app = express();

app.use(bodyParser.json());

app.use('/category', categoryRoutes);
app.use('/ad', adRoutes);
app.use('/comment', commentRoutes);

app.listen(3000, () => console.log('Server is running on port 3000'));

module.exports = app;
