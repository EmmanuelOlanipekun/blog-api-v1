const express = require("express");
const userRouter = require("./routes/users/userRoutes.js");
const postRouter = require("./routes/posts/postRoutes.js")
const commentRouter = require("./routes/comments/commentRoutes.js")
const categoryRouter = require("./routes/categories/categoryRoutes.js")
const dotenv = require ("dotenv");
const globalErrorHandler = require("./middlewares/globalErrorHandler.js");
dotenv.config();
require("./config/dbConnect.js");

const app = express();

//middlewares
app.use(express.json()); //parse incoming payload
 
//routes
//------
//users route
app.use("/api/v1/users", userRouter);

//-----
//post route
app.use("/api/v1/posts", postRouter);
//-----

//comment route
app.use("/api/v1/comments", commentRouter);
//------

//categories route
app.use("/api/v1/categories", categoryRouter);
//-----
//Error handler middleware
app.use(globalErrorHandler);

//404 error handler
app.all("/{*any}", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} -- Route not found.`
  });
});


//Listen to server
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));