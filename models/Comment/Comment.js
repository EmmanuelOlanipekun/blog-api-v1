const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post is required"],
    },

    user: {
        type: Object,
        required: [true, "User is reuired"],
    },
    description: {
        type: String,
        reuired:[true, "Descriptuion is reuired"],
    },
}, 
{ timestamps: true }
);

//Compile & export comment model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
