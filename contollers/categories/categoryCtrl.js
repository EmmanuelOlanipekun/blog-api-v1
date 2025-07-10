const Category = require("../../models/Categories/Category");
const appError = require("../../utils/appError");


//Create a category
const createCategoryCtrl = async(req, res, next) => {
    //Title of category
    const{ title } = req.body;
    try{
        //Create a category
        const category = await Category.create({ title, user: req.userAuth })
        res.json({
            status: "success",
            data: category,
        });
    }catch (error) {
        return next(appError(error.message));
    };
};

//Fetch a category
const fetchCategoryCtrl = async(req, res, next) => {
    try{
        //Find all categories
        const categories = await Category.find();
        res.json({
            status: "success",
            data: categories,
        });
    }catch( error ) {
       return next(appError(error.message));
    };
};

//Fetch a single category
const fetchSingleCategoryCtrl = async(req, res, next) => {
    try{
        //Find a single category
        const category = await Category.findById(req.params.id);
        res.json({
            status: "success",
            data: category,
        });
    }catch( error ) {
       return next(appError(error.message));
    };
};

//Delete a category
const deleteCategoryCtrl = async(req, res, next) => {
    try{
        //Find a single category
        const category = await Category.findByIdAndDelete(req.params.id);
        res.json({
            status: "success",
            data:"Category deleted"
        });
    }catch (error){
        return next(appError(error.message));
    };
};

//Update a category
const updateCategoryCtrl = async(req, res, next) => {
    const { title } = req.body;
    try{
        //Find a single category and update
        const category = await Category.findByIdAndUpdate(req.params.id, { title }, {
            new: true,
            runValidators: true
        });
        res.json({
            status: "success",
            data: category
        });
    }catch (error) {
        return next(appError(error.message));
    };
};

module.exports = {
    createCategoryCtrl,
    fetchCategoryCtrl,
    fetchSingleCategoryCtrl,
    deleteCategoryCtrl,
    updateCategoryCtrl,
}