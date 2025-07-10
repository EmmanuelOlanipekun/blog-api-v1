const express = require("express");
const multer = require("multer");
const storage = require("../../config/cloudinary");
const { postCreateCtrl, postFetchCtrl, fetchAllPostsCtrl, toggleLikePostsCtrl, toggleDislikePostsCtrl, postViewsCtrl, postDeleteCtrl, postUpdateCtrl } = require("../../contollers/posts/postCtrl");
const isLoggedIn = require("../../middlewares/isLoggedIn");



const postRouter = express.Router();

//File(photo) upload
const upload = multer({ storage });

//Create a post
postRouter.post('/create-post', isLoggedIn, upload.single("image"), postCreateCtrl);

//Fetch a user post
postRouter.get('/fetch-post/:id', isLoggedIn, postFetchCtrl);

//like-unlike a user post
postRouter.get('/like-post/:id', isLoggedIn, toggleLikePostsCtrl);

//dislike a user post
postRouter.get('/dislike-post/:id', isLoggedIn, toggleDislikePostsCtrl);

//post views
postRouter.get('/post-views/:id', isLoggedIn, postViewsCtrl);

//Get all the posts
postRouter.get('/all-posts', isLoggedIn, fetchAllPostsCtrl);

//Delete a post
postRouter.delete('/delete-post/:id', isLoggedIn, postDeleteCtrl);

//Update a post
postRouter.put('/update-post/:id', isLoggedIn, upload.single("image"), postUpdateCtrl);


module.exports = postRouter;