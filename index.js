const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const dbURI = 'mongodb://localhost/blog_app';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
  mongoose.connect(dbURI);
});

app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
