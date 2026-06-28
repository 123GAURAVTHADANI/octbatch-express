var express = require("express");
const {
  getUser,
  createUser,
  signIn,
} = require("../controllers/user.controller");
const {
  ageCheckMiddleware,
  adhaarCardCheckMiddleware,
  isAuthorized,
} = require("../middlewares/user.middleware");

var userRouter = express.Router();

userRouter.get("/getUser", isAuthorized, getUser);
userRouter.post("/createUser", createUser);
userRouter.post("/login", signIn);

module.exports = { userRouter };
