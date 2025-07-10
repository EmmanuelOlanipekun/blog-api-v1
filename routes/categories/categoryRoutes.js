const express = require("express");
const { createCategoryCtrl, fetchCategoryCtrl, fetchSingleCategoryCtrl,  deleteCategoryCtrl, updateCategoryCtrl } = require("../../contollers/categories/categoryCtrl");
const isLoggedIn = require("../../middlewares/isLoggedIn");


const categoryRouter = express.Router();

//Create a category
categoryRouter.post('/create-category', isLoggedIn, createCategoryCtrl);

//Fetch a user category
categoryRouter.get('/fetch-categories', fetchCategoryCtrl);

//Fetch a single category
categoryRouter.get('/fetch-category/:id', fetchSingleCategoryCtrl);

//Delete a category
categoryRouter.delete('/delete-category/:id', isLoggedIn, deleteCategoryCtrl);

//Update a category
categoryRouter.put('/update-category/:id', isLoggedIn, updateCategoryCtrl);

module.exports = categoryRouter;