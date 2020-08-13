const express = require('express');
const router = express.Router();
// const db = require('../models/blogPost');
const BlogPost = require('../models/blogPost');

//============================
//TEST ROUTES
router.get('/', (req, res)=>    {
    // const data = {
    //     username: 'dennis',
    //     age: 27 
    // };

    BlogPost.find({ })
        .then((data)=>{
            console.log(data);
            res.json(data);
        })
        .catch((error)=>{
            console.log(error)
        })
});


//TO ARRAY -USING MONGODB SYNTAX
router.get('/check', (req, res)=>{
    BlogPost.collection.find({}).toArray()
    .then((data)=>{
        console.log(data)
        res.json(data)
    })
});

// router.post('/save', (req, res)=>{
//     console.log(req.body);
//     res.json({
//         msg: "we received your data",
//         data: req.body
//     })
// })

router.post('/save', (req, res)=>{
    console.log(req.body);
    const data = req.body;
    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error)=>{
        if(error) {
            console.log(error);
            res.json({
                message: error
            })
        } else {
            console.log("Data Saved in DB");
            res.json(newBlogPost); 
        }
    })

    //CHECK IN ROBO3T
   
})

router.get('/name', (req, res)=>{
    const data = {
        username: 'peterson',
        age: 28
    };
    res.json(data);
});
//============================


module.exports = router;