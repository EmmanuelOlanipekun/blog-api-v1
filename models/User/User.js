const mongoose  = require("mongoose");
const Post = require("../Post/Post");
const Category = require("../../models/Categories/Category");


//Create user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    }, 
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    profilePhoto: {
        type: String,
    }, 
    email: {
        type: String,
        required: [true, "E-mail is required"]
    }, 
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }, 
    role: {
        type: String,
        enum:["Admin", "Editor", "Guest"],
    },
    viewers: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     },
    ],
    followers: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     },
    ],
    following: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     },
    ],
    userPosts: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
     },
    ],
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
     },
    ],
    blocked: [
         {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
    ],
    // plan: {
    //     type: String,
    //     enum: ["Free", "Premium", "Pro"],
    //     default: "Free",
    // },
    userAwards: {
        type: String,
        enum: ["Bronze", "Silver", "Gold"],
        default: "Bronze",
    } 
}, {
    timestamps: true,
    toJSON: {virtuals: true},
}
);

//Hooks
//Pre-hooks
userSchema.pre("findOne", async function(next){ 

    //Populate the posts
    this.populate({
     path: "userPosts",
    });
    //Get user id
    const userId = this._conditions._id;
    //Get user post
    const posts = await Post.find({user: userId});
    //Get last post
    const lastPost = posts[posts.length - 1];

    //Get last post date
    const lastPostDate = new Date(lastPost?.CreatedAt);
    //Get last post date in string format
    const lastPostDateStr = lastPostDate.toDateString();
   //Add as virtual property
    userSchema.virtual("lastPostDate").get(function() {
        return lastPostDateStr;
    });

    //Check if a user is not active

    //Check current date
    const currentDate = new Date();

    //Check the difference between the last post date and the current date
    const diff = currentDate - lastPostDate;
    //Get the difference in days
    const diffInDays = diff / (1000 * 3600 * 24);
    
    //Create a virtual schema to handle if the user is inactive after not posting for 30 days
    if(diffInDays > 3000) {
        userSchema.virtual("isInactive").get(function() {
            return true
        });
        //Find userbyIdAndUpdate
        await User.findByIdAndUpdate(userId, {
            isBlocked: true
        },{
            new: true
        });
    } else{
        userSchema.virtual("isInactive").get(function() {
            return false
        });
        //Find userbyIdAndUpdate
        await User.findByIdAndUpdate(userId, {
            isBlocked: false
        },{
            new: false
        });
    }

    // Last date a user was active
    
    //Turn diffInDays to a whole number
    const daysAgo = Math.floor(diffInDays)
    //Add virtul lastActive to date
    userSchema.virtual("lastActive").get(function() {
        if(daysAgo === 0){
            return "Active Today";
        } if (daysAgo === 1) {
            return "Active yesterday"
        } else {
            return `Last active ${daysAgo} days ago`
        }
    });

    //Update user award based on number of posts
    //Get the number of posts
    const numOfPosts = posts.length;

    //Check if user posts are less than 1000
    if(numOfPosts < 1000) {
        await User.findByIdAndUpdate(userId, {
            userAwards: "Bronze"
        }, {
            new: true
        });
    }

    //Check if user posts are greater than 10000
    if(numOfPosts > 10000) {
        await User.findByIdAndUpdate(userId, {
            userAwards: "Silver"
        }, {
            new: true
        });
    }

    //Check if user posts are greater than 100000
    if(numOfPosts > 100000) {
        await User.findByIdAndUpdate(userId, {
            userAwards: "Gold"
        }, {
            new: true
        });
    }
    next();
});

//Get full name of user
userSchema.virtual("fullname").get(function() {
    return  `${this.firstName} ${this.lastName}`;
});

//User initials
userSchema.virtual("initials").get(function() {
    return  `${this.firstName[0]}.${this.lastName[0]}`;
});

//User posts count
userSchema.virtual("post-count").get(function() {
    return  this.userPosts.length;
});

//User following count
userSchema.virtual("following-count").get(function() {
    return  this.following.length;
});

//User followers count
userSchema.virtual("followers-count").get(function() {
    return  this.followers.length;
});

//User viewers count
userSchema.virtual("viewers-count").get(function() {
    return  this.viewers.length;
});

//Users block count
userSchema.virtual("blocked count").get(function() {
    return  this.blocked.length;
});

//Compile & export user model
const User = mongoose.model("User", userSchema);

module.exports = User;
