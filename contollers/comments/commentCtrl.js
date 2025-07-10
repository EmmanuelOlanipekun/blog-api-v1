const Comment = require("../../models/Comment/Comment");
const Post = require("../../models/Post/Post");
const User = require("../../models/User/User");
const appError = require("../../utils/appError");



//Create a comment
const commentCreateCtrl =async(req, res, next) => {
    const { description } = req.body;
    try{
        //Find the post
        const post = await Post.findById(req.params.id);
        //Create the comment
        const comment = await Comment.create({
            post: post._id,
            description,
            user: req.userAuth
        });
        //Push the comment to the post
        post.comments.push(comment._id);
        //Find the user
        const user = await User.findById(req.userAuth);
        //Push to user
        user.comments.push(comment._id);
        //save comment
        await post.save({ validateBeforeSave: false });
        await user.save({ validateBeforeSave: false });


        res.json({
            status: "success",
            data: comment
        });
    }catch (error) {
        return next(appError(error.message));
    }
}

//Delete a comment
const deleteCommentCtrl = async(req, res, next) => {
    try{
        //Find the comment
        const comment = await Comment.findById(req.params.id);

        //Check if comment belog to user
        if(comment.user.toString() !== req.userAuth.toString()) {
            return next(appError("Comment does not belong to user!", 403));
        }
        await Comment.findByIdAndDelete(req.params.id);
        res.json({
            status: "success",
            data:"Comment deleted succesfully"
        });
    }catch (error) {
        return next(appError(error.message));
    };
};

const updateCommentCtrl = async(req, res, next) => {
    const { description } = req.body;
    try{
        //Find the comment
        const comment = await Comment.findById(req.params.id);

        //Check if comment belog to user
        if(comment.user.toString() !== req.userAuth.toString()) {
            return next(appError("Comment does not belong to user!", 403));
        }
        //Find a single category and update
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,
         { 
          description
         },{
          new: true,
          runValidators: true
        });
        res.json({
            status: "success",
            data: updatedComment
        });
    }catch (error) {
        return next(appError(error.message));
    };
};


module.exports = {
    commentCreateCtrl,
    deleteCommentCtrl,
    updateCommentCtrl
}