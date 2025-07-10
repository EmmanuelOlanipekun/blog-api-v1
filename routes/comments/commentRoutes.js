const express = require("express");
const { commentCreateCtrl, deleteCommentCtrl, updateCommentCtrl } = require("../../contollers/comments/commentCtrl");
const isLoggedIn = require("../../middlewares/isLoggedIn");


const commentRouter = express.Router();

//Create a comment
commentRouter.post('/create-comment/:id', isLoggedIn, commentCreateCtrl);

//Delete a comment
commentRouter.delete('/delete-comment/:id',isLoggedIn, deleteCommentCtrl);

//Update a comment
commentRouter.put('/update-comment/:id', isLoggedIn, updateCommentCtrl);


module.exports = commentRouter;