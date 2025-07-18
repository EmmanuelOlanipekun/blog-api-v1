const cloudinary = require("cloudinary").v2;
require("dotenv").config()
const {CloudinaryStorage} = require("multer-storage-cloudinary");

//Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

//Instance of cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary, 
    allowedFormat: ["jpg", "png"],
    params: {
        folder: "Blog-api",
        transformation: [{width: 500, height: 500, crop: "limit"}],
    },
});

module.exports = storage;