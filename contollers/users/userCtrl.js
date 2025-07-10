const bcrypt = require("bcryptjs");
const User = require("../../models/User/User");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const appError = require("../../utils/appError");
const Post = require("../../models/Post/Post");
const Category = require("../../models/Categories/Category");
const Comment = require("../../models/Comment/Comment");


//async function is the business logic of the application

//User register controller
const userRegisterCtrl = async(req, res, next) => {
   const {firstName, lastName, email, password} = req.body;

    try{

        //Check if email exists
        const userFound = await User.findOne({ email });
         if(userFound) {
            return next(appError("User already exists!", 500));
        }
         //hash password
         const salt = await bcrypt.genSalt(10);

         const hashedPassword = await bcrypt.hash(password, salt);
         //create user
        const user = await User.create({
            firstName, 
            lastName,
            email, 
            password: hashedPassword,
        });

        res.json({
            status: "success",
            data: user,
        });
    }catch(error){
       next(appError(error.message));
    };
};

//User Login Controller
const userLoginCtrl =  async(req, res, next) => {
    const{ email, password } = req.body;

    try{
       //Check if email exists
       const userFound = await User.findOne({ email });

       if(!userFound) {
        return next(appError("Invalid login credentials!"))
       }

       //validity of password
       
       const isPasswordMatched = await bcrypt.compare( password, userFound.password );

       if(!isPasswordMatched) {
         return next(appError("Invalid login credentials!"))
       }
        res.json({
            status: "success",
            data: {
                firstName: userFound.firstName,
                lastName: userFound.lastName,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                token: generateToken(userFound._id)
            }
        });
    }catch(error) {
        next(appError((error.message)));
    };
};
 
//Profile views controller
const profileViewsCtrl = async(req, res, next) => {
    try{
        //Find the original user
        const user = await User.findById(req.params.id);

        //Find the veiwer 
        const profileViewer = await User.findById(req.userAuth);

        //Check if original user and profile viewer are found
        if(user && profileViewer) {
            //Check if profileViewer is in the previous viewer array
            const previousViewers = user.viewers.find( viewer => viewer.toString() === profileViewer._id.toJSON()
         );
            if(previousViewers) {
             return next(appError("You have already viewed this profile"))
            } else {
                //Push viewer to viewers array
                user.viewers.push(profileViewer._id);
                //Save user
               await user.save()
                    res.json({
                    status: "success",
                    data:"Profile viewed successfully"
                });
            }
        } 
    }catch (error) {
        next(appError(error.message));
    };
};

//Following controller
const followingCtrl = async(req, res, next) => {
    try{
        //Find the user to follow
        const userToFollow = await User.findById(req.params.id);

        //Find the user who is following
        const userWhoFollowed = await User.findById(req.userAuth);

        //Check if user and user following are found
        if(userToFollow && userWhoFollowed){
            //Check if user is alreading in the user following array
            const isUserFollowed = userToFollow.following.find(follower => follower.toString() === userWhoFollowed._id.toString()
         );

         //Check if user is already following
            if(isUserFollowed) {
                return next(appError("User already followed"));
            } else {
                //Push new following to followers array
                userToFollow.followers.push(userWhoFollowed._id);
                //Push new follower to user following array
                userWhoFollowed.following.push(userToFollow._id);

                //Save users
                await userToFollow.save();
                await userWhoFollowed.save();
                res.json({
                status: "success",
                data:"User followed succesfully"
                });
            };
        };
    }catch (error) {
        next(appError(error.message));
    };
};

//Unfollowing controller
const unfollowingCtrl = async(req, res, next) => {
    try{
        //Find user to unfollow
        const userToBeUnfollowed = await User.findById(req.params.id);

        //Find user who is unfollowin
        const userUnfollowing = await User.findById(req.userAuth);

        //Check if both users are found
        if(userToBeUnfollowed && userUnfollowing) {
            //Check if users who unfollowed is in the followers array
            const isUserAlreadyFollowed = userToBeUnfollowed.followers.find(follower => follower.toString() === userUnfollowing._id.toString()
            );
            if(!isUserAlreadyFollowed) {
                return next(appError("User not followed!"));
            } else {
                //Remove user who unfollowed from the followers array
                userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter
                    (follower => follower.toString() !== userUnfollowing._id.toString()
                );
                //Save 
                await userToBeUnfollowed.save();
                //Remove user to be unfollowed from followers array
                userUnfollowing.following = userUnfollowing.following.filter
                    (following => following.toString() !== userToBeUnfollowed._id.toString()
                );
                //Save
                await userUnfollowing.save()
                res.json({
                 status: "success",
                 data:"Users successfully unfollowed"
                });
            }
        }

    }catch(error) {
        next(appError(error.message));
    };
};

//Block user controller
const blockUsersCtrl = async(req, res, next) => {
    try{
        //Find user to block
        const userToBeBlocked = await User.findById(req.params.id);

       //Find user who is blocking
       const userWhoBlocked = await User.findById(req.userAuth);

      //Check if user to be blocked and who blocked are found
        if(userWhoBlocked && userToBeBlocked) {
            // //Check if user is blocking user
            // if (userToBeBlocked === userToBeBlocked) {
            //     return next (appError ("Unable to block user!"))
            // }
            //Check if user to be blocked is already blocked
            const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
                blocked => blocked.toString() === userToBeBlocked._id.toString()
            );
            if(isUserAlreadyBlocked) {
                return next ( appError("User already blocked!") );
            }
            //Push user to be blocked to the blocked array
            userWhoBlocked.blocked.push(userToBeBlocked._id);
            //save
            await userWhoBlocked.save();
           
            res.json({
                status: "success",
                data:"Users blocked succesfully!"
            });
        }
        
    }catch (error){
     next(appError(error.message));
    };
};

const unblockUsersCtrl = async(req, res, next) => {
    try{
        //Find user to unblock
        const userToBeUnblocked = await User.findById(req.params.id);

       //Find user who is unblocking
       const userWhoUnblocked = await User.findById(req.userAuth);
        //Check if user to be unblocked is already blocked
        if(userToBeUnblocked && userWhoUnblocked) {
            const isUserAlreadyBlocked = userWhoUnblocked.blocked.find(
              blocked => blocked.toString() === userToBeUnblocked._id.toString()
            );
            if(!isUserAlreadyBlocked) {
                return next ( appError("User not blocked!") );
            } 
        }
         
        // Remove from blocked array
       userWhoUnblocked.blocked = userWhoUnblocked.blocked.filter(
           blocked => blocked.toString() !== userToBeUnblocked._id.toString()
        );
        
        //save
        await userWhoUnblocked.save();
        res.json({
         status: "success",
         data:"Users unblocked succesfully!"
        });
    }catch (error){
     next(appError(error.message));
    };
};

//Admin block users controller
const adminBlockCtrl = async(req, res, next) => {
    try{
        //Find user to be blocked by admin
        const userToBeBlocked = await User.findById(req.params.id);

        //Check if user to be blocked is found
        if(!userToBeBlocked) {
            return next(appError("User not found!"));
        }
        //Change isBlocked field to true
        userToBeBlocked.isBlocked = true;

        //Save
        await userToBeBlocked.save();

        res.json({
            status: "success",
            data:"User blocked by admin!"
        });
    }catch(error){
        next(appError(error.message));
    };
};

const adminUnblockCtrl = async(req, res, next) => {
    try{
        //Find user to be unblocked by admin
        const userToBeUnblocked = await User.findById(req.params.id);

        //Check if user to be unblocked is found
        if(!userToBeUnblocked) {
            return next(appError("User not found!"));
        }
        //Change isBlocked field to false
        userToBeUnblocked.isBlocked = false;

        //Save
        await userToBeUnblocked.save();

        res.json({
            status: "success",
            data:"User unblocked by admin!"
        });
    }catch(error){
        next(appError(error.message));
    };
};

//All users controller
const allUsersCtrl = async(req, res, next) => {
    try{
        const users = await User.find()
        res.json({
            status: "success",
            data: users,
        });
    }catch (error) {
        next(appError(error.message));
    };
};
//Users profile controller
const usersProfileCtrl = async(req, res, next) => {
    try{
        const user = await User.findById(req.userAuth);
        res.json({
            status: "success",
            data: user,
        });
    }catch (error) {
        next(appError(error.message));
    };
};


//Update users controller
const updateUsersCtrl =  async(req, res, next) => {
    const { email, lastName, firstName } = req.body;
    try{
        //Check if email is not taken
        if(email) {
            const emailTaken = await User.findOne( { email });
            if(emailTaken) {
                return next(appError("E-mail already used by another user!", 400))
            }
        }

        //Update the user
        const user = await User.findByIdAndUpdate(req.userAuth, {
            email,
            lastName,
            firstName,
        }, {
            new: true,
            runValidation: true,
        })
        //Send response
        res.json({
            status: "success",
            data: user
        });
    }catch(error){
        next(appError(error.message));;
    };
};

//Update users password controller
const updatePasswordCtrl =  async(req, res, next) => {

    //Check if password is same as old password
    const { password } = req.body;

    try{
        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //update user
            await User.findByIdAndUpdate(
                req.userAuth, 
               { password: hashedPassword },
               { new: true, runValidation: true }
            );

            res.json({
             status: "success",
             data: "Password successfully updated!"
            });
        } else {
            return next(appError("Please provide new password!"))
        }
    }catch (error){
        next(appError(error.message));
    };
};

//Delete users account controller
const deleteAccountCtrl =  async(req, res) => {
    try{

        //Find user to be deleted
        const userToDelete = await User.findById(req.userAuth);
        //Find all posts to be deleted
        await Post.deleteMany({ user: req.userAuth });
        //Find all comment to delete
        await Comment.deleteMany({ user: req.userAuth });
        //Find all category to delete
        await Category.deleteMany({ user: req.userAuth });
       
        //Delete User
        await userToDelete.deleteOne();

        //Send response  
        res.json({
         status: "success",
         data: "User acoount successfully deleted!"
        });

    }catch (error){
        next(appError(error.message));
    };
};

//Users profile photo upload
const profilePhotoUploadCtrl =  async(req, res, next) => {              
    try{
        //Find user to be updated
        const userToUpdate = await User.findById(req.userAuth);
        //Check if user is found

        if(!userToUpdate) {
            return next(appError("User Not Found", 403));
        }

        //Check if user is blocked

        if(userToUpdate.isBlocked) {
            return next(appError("Unable to update, acccount blocked!", 403));
        }

        //Check if user is uploading profile photo

        if(req.file){
            //Update the profile photo
            await User.findByIdAndUpdate( req.userAuth, {
                $set: {
                    profilePhoto: req.file.path,
                },
            },{
                new: true,
            }
            );
           res.json({
            status: "success",
            data:"Profile photo successfully updated!"
           });
        }
    
    }catch (error) {
        next(appError(error.message, 500));
    };
};

module.exports = {
    userRegisterCtrl, 
    userLoginCtrl,
    usersProfileCtrl,
    allUsersCtrl,
    updateUsersCtrl,
    updatePasswordCtrl,
    profilePhotoUploadCtrl,
    profileViewsCtrl,
    followingCtrl,
    unfollowingCtrl,
    blockUsersCtrl,
    unblockUsersCtrl,
    deleteAccountCtrl,
    adminBlockCtrl,
    adminUnblockCtrl,
};