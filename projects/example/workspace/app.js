const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());

const serviceAccount = require('./admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const categoryRoutes = require('./routes/category');

const db = admin.firestore();

app.use('/category', categoryRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
