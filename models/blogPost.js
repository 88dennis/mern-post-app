const mongoose = require('mongoose');

//SCHEMA
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now(),
    }
});

//MODEL
//register your schema
//used to access/ create something in the db
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

//EXPORT YOUR MODEL TO USE IT AND CONNECT TO OTHER FILES AND REQUIRE IT
module.exports = BlogPost;