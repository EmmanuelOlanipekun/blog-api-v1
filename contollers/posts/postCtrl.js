const Post = require("../../models/Post/Post");
const User = require("../../models/User/User");
const Category = require("../../models/Categories/Category");
const appError = require("../../utils/appError");
const Comment = require("../../models/Comment/Comment");


//Create a post
const postCreateCtrl = async(req, res, next) => { 
    const {title, description, category} = req.body;
    try{
        //Find the user(AUTHOR)
        const author = await User.findById(req.userAuth);

        //Check is user is blocked
        if(author.isBlocked) {
            return next(appError("Access denied, account blocked!", 400));
        };
        //Create a post
        const postCreated = await Post.create({
            title,
            description,
            user: author._id,
            category,
            photo: req?.file?.path,
        });
        //Link post to a user and push posts to user posts array
        author.userPosts.push(postCreated);
        //Save user
        await author.save();
        res.json({
            status: "success",
            data: postCreated,
        });
    }catch (error) {
        next(appError(error.message));
    };
};

//Fetch a post
const postFetchCtrl = async(req, res, next) => {
    try{
        const post = await Post.findById(req.params.id).populate("user").populate("category").populate("comments");
        res.json({
            status: "success",
            data: post
        });
    }catch (error) {
       next(appError(error.message));
    };
};

//Get all posts
const fetchAllPostsCtrl = async(req, res, next) => {
    //Find all posts
    const posts = await Post.find({}).populate("user").populate("category").populate("comments");
    try{
        res.json({
            status: "success",
            data: posts,
        });
    }catch (error) {
        next(appError(error.message));
    };
};

//Toggle like controller
const toggleLikePostsCtrl = async(req, res, next) => {
    try{
        //Get the post
        const post = await Post.findById(req.params.id);
        //Check if user already liked post
        const isLiked = post.likes.includes(req.userAuth);
        if (isLiked) {
            post.likes = post.likes.filter( like => like != req.userAuth);
            await post.save();
        } else{
            post.likes.push(req.userAuth);
            await post.save();
        }
        res.json({
            status: "success",
            data: post
        });
    }catch (error) {
        next(appError(error.message));
    };
};

//Toggle dislike controller
const toggleDislikePostsCtrl = async(req, res, next) => {
    try{
        //Get the post
        const post = await Post.findById(req.params.id);
        //Check if user already unliked post
        const isDisliked = post.dislikes.includes(req.userAuth);
        if (isDisliked) {
            post.dislikes = post.dislikes.filter( dislike => dislike != req.userAuth);
            await post.save()
        } else{
            post.dislikes.push(req.userAuth);
            await post.save();
        }
        res.json({
            status: "success",
            data: post
        });
    }catch (error) {
        next(appError(error.message));
    };
};

//Post viewers controller
const postViewsCtrl = async(req, res, next) => {
    try{
        //Find post 
        const post = await Post.findById(req.params.id);
        //Check if user already viewed post
        const whoViewed = post.Views.includes(req.userAuth);

        if (whoViewed) {
            res.json({
            status: "success",
            data: post
        });
        } else {
            post.Views.push(req.userAuth);
            await post.save();
            res.json({
            status: "success",
            data: post
        });
        }
    }catch (error) {
       next(appError(error.message));
    };
};


//Delete a post
const postDeleteCtrl = async(req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);

        //Check if post belog to user
        if(post.user.toString() !== req.userAuth.toString()) {
            return next(appError("Post does not belong to user!", 403));
        }
        await Post.findByIdAndDelete(req.params.id);
        res.json({
            status: "success",
            data: "Post deleted"
        });
    }catch (error) {
        next(appError(error.message));
    };
};

//Update a post
const postUpdateCtrl = async(req, res, next) => {
    const {title, description, category} = req.body;
    try{
        const post = await Post.findById(req.params.id);

        //Check if post belog to user
        if(post.user.toString() !== req.userAuth.toString()) {
            return next(appError("Post does not belong to user!", 403));
        }
        await Post.findByIdAndUpdate(req.params.id, {
            title,
            description,
            category,
            photo: req?.file?.path,
        }, {
            new: true,
            runValidators: true,
        });
        res.json({
            status: "success",
            data: post
        });
    }catch (error) {
        next(appError(error.message));
    };
};

module.exports = {
    postCreateCtrl,
    postFetchCtrl,
    fetchAllPostsCtrl,
    postDeleteCtrl,
    postUpdateCtrl,
    toggleLikePostsCtrl,
    toggleDislikePostsCtrl,
    postViewsCtrl
};