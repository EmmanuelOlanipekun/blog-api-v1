const mongoose = require("mongoose");
const User = require("../User/User");
const Category = require("../../models/Categories/Category");



const postSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Post description is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Post category is required"],
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }
    ],
    Views: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     },
    ],
    likes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     },
    ],
    dislikes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     },
    ],
    user: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"],
     },
    ],
    photo:{
        type: String,
    },


}, {
    timestamps: true,
    toJSON: { virtuals: true },
}
);

//Hook middleware
postSchema.pre(/^find/, function(next){
    // Add the views count
    postSchema.virtual("Views-count").get(function () {
        const post = this;
        return post.Views.length;
    });

    // Add the likes count
    postSchema.virtual("likes-count").get(function () {
        const post = this;
        return post.likes.length;
    });

    // Add the dislikes count
    postSchema.virtual("dislikes-count").get(function () {
        const post = this;
        return post.dislikes.length;
    });

    // Likes percentage
    postSchema.virtual("likesPercentage").get(function() {
        const post = this;
        const total = +post.likes.length + +post.dislikes.length;
        const percentage = (post.likes.length/total) * 100
        return `${percentage}%`;
    });

    // Dislikes percentage
    postSchema.virtual("dislikesPercentage").get(function() {
        const post = this;
        const total = +post.likes.length + +post.dislikes.length;
        const percentage = (post.dislikes.length/total) * 100
        return `${percentage}%`;
    });

    //Date/Day post was made
    postSchema.virtual("daysAgo").get(function () {
        const post = this;
        const date = new Date(post.createdAt);
        const daysAgo = Math.floor((Date.now() - date) / 86400000);
        return daysAgo ===0 
        ? "Today" : daysAgo ===1 
        ? "Yesterday": 
        `${daysAgo} days ago`
    });

    next();
});

//Compile & export post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
