const express = require ("express");
const { userRegisterCtrl, userLoginCtrl, usersProfileCtrl, allUsersCtrl,  updateUsersCtrl, profilePhotoUploadCtrl, profileViewsCtrl, followingCtrl, unfollowingCtrl, blockUsersCtrl, unblockUsersCtrl, updatePasswordCtrl, deleteAccountCtrl, adminBlockCtrl, adminUnblockCtrl } = require("../../contollers/users/userCtrl");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const storage = require("../../config/cloudinary");
const multer = require("multer");
const isAdmin = require("../../middlewares/isAdmin");


//instance of mutlter
const upload = multer({ storage });


const userRouter = express.Router();

//register user
userRouter.post('/register', userRegisterCtrl);

//Login user
userRouter.post('/login', userLoginCtrl);

//Access user profile
userRouter.get('/profile/', isLoggedIn,  usersProfileCtrl);

//Get all the users
userRouter.get('/', allUsersCtrl);


//Update a user detail
userRouter.put('/update-user/:id', isLoggedIn, updateUsersCtrl);

//Update a user password
userRouter.put('/update-password', isLoggedIn, updatePasswordCtrl);

//Update profile photo
userRouter.post('/profile-photo-upload', 
    isLoggedIn, 
    upload.single("Profile"), 
    profilePhotoUploadCtrl
);

//View my profile
userRouter.get('/profile-viewers/:id',isLoggedIn, profileViewsCtrl);

//Following profile
userRouter.put('/following/:id',isLoggedIn, followingCtrl);


//UnFollowing profile
userRouter.put('/unfollowing/:id',isLoggedIn, unfollowingCtrl);

//Blocking profile
userRouter.put('/block/:id',isLoggedIn, blockUsersCtrl);

//Unblocking profile
userRouter.put('/unblock/:id',isLoggedIn, unblockUsersCtrl);

//Delete account
userRouter.delete('/delete-account/:id',isLoggedIn, deleteAccountCtrl);


//Admin block profile
userRouter.put('/admin-block/:id',isLoggedIn, isAdmin, adminBlockCtrl);

//admin unblocking profile
userRouter.put('/admin-unblock/:id',isLoggedIn, isAdmin, adminUnblockCtrl);

module.exports = userRouter;