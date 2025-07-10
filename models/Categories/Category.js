const mongoose = require("mongoose")
const Post = require("../Post/Post");

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        reuired: true,
    },
}, 
{ 
    timestamps: true 
});

//Compile & export category model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;