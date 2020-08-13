const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
// const cors = require('cors');
const path = require('path');
const app = express();

//sadasdas
//the process.env.PORT will be used by heroku
//whatever port heroku can give it will give you by using procerss.env.PORT
//to refresh the terminal type: killall -9 node
const PORT = process.env.PORT || 8080;
// const PORT = 8000;
//go in the routes folder and use the FILE in particular
const routes = require('./routes/api')
const BlogPost = require('./models/blogPost');

// const MONGODB_URI = 'mongodb+srv://88dennis:88dennis@cluster0.m6gfk.gcp.mongodb.net/mypostapp?retryWrites=true&w=majority'

// || 'mongodb://localhost:27017/mypostapp'
// mongoose.connect('mongodb://localhost:27017/mypostapp', {
// mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/mypostapp', {
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mypostapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//this will tell you if you are connected
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected')
});
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    }
// app.use(bodyParser.json());
app.use(express.json());
//for simple objects you may use extended false
//for deep nested objects use true
app.use(express.urlencoded({extended: false}));

//==========================================
//SAVING SOMETHING IN DATABASE - FAKE DATA
// app.get("/seed", function(req, res){
//     const data = {
//         title: 'Welcome to my post',
//         body: 'This is my first Post...........',
    
//     };
//     //creating a new instance of your model
//     //this instance is where we pass the data
//     const newBlogPost = new BlogPost(data);
//     console.log(newBlogPost)
//     //.save() the new instance
//     // newBlogPost.save((error)=>{
//     //     if(error){
//     //         console.log('Error saving the data');
//     //     } else {
//     //         console.log('Data has been saved');
//     //     }
//     // })
//     res.json(newBlogPost)
// });
//=================================




//cors helps you access servers from different origins
//you can use proxy too for a way around it
//in package.json client folder insert proxy with the port you are using in your backend
//the PROXY will let client search for any routes in your server port if it is not on 3000
// app.use(cors());

//morgan is HTTP request logger - will log what routes we are hitting
app.use(morgan('tiny'));

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'build')));
  
//     app.get('/', (req, res) => {
  
//       res.sendFile(path.join(__dirname, 'build', 'index.html'));
//     });
//   }
//CONFIGURE THE ROUTES
//define a starting point = "/" or "/api" or anything
// app.use("/", routes)

app.use("/api", routes) 

// if(process.env.NODE_ENV === 'production') {
//     //get to the build folder
//     app.use(express.static('client/build'));
// }


// if(process.env.NODE_ENV === 'production') {
//     //get to the build folder
//     app.use(express.static('client/build'));
// }


if (process.env.NODE_ENV === 'production') {
    app.get('*', function(req,res){
        res.sendFile(path.join(__dirname + 'client/build/index.html'));
    });
    }

app.listen(PORT, () => {
    console.log(`server connected to ${PORT}`)
});