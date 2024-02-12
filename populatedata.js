const mongoose = require('mongoose');
const Post = require('./models/post');
const Comment = require('./models/comment');

mongoose.connect('mongodb://localhost/blog_app', { useNewUrlParser: true, useUnifiedTopology: true });

const postsData = [
  { title: 'Post 1', content: 'Lorem ipsum dolor sit amet.' },
  { title: 'Post 2', content: 'Consectetur adipiscing elit.' },
];

const commentsData = [
  { postId: 'post_id_1', content: 'comment for post 1' },
  { postId: 'post_id_2', content: 'comment for post 2' },
];

async function populateData() {
  try {
    await Post.insertMany(postsData);
    await Comment.insertMany(commentsData);
    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    mongoose.disconnect();
  }
}

populateData();
