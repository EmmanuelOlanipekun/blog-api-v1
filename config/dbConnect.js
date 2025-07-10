const mongoose = require("mongoose");

//Connection to database

const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.MongoDB_URL);
        console.log("Database is connected");
    } catch {
        console.log(error.message);
        process.exit(1);
    }
}


//Exporting using dbConnect......anytime dbConnect.js is called(or required) dbConncect function will run
dbConnect();