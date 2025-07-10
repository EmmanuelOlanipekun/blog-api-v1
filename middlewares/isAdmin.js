const User = require("../models/User/User");
const appError = require("../utils/appError");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");


const isAdmin = async (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req);
  //verify the token
  const decodedUser = verifyToken(token);
  //save the user into req obj
  req.userAuth = decodedUser.id;
            
  //Find user in DB
  const user = await User.findById(decodedUser.id);

  //Check if admin
  if(user.isAdmin) {
    return next();
  } else {
    return next(appError("Access Denied! Admin only.", 403));
  };
};

module.exports = isAdmin;