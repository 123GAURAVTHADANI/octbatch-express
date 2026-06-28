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
  authorize,
} = require("../middlewares/user.middleware");
const { User } = require("../models/user.model");

var userRouter = express.Router();

userRouter.get(
  "/getUser",
  isAuthorized,
  authorize("super-admin", "admin"),
  getUser,
);

// userRouter.delete(
//   "/deletUsers",
//   isAuthorized,
//   authorize("admin", "super-admin"),
//   deleteUser,
// );
userRouter.post("/createUser", createUser);
userRouter.post("/login", signIn);

module.exports = { userRouter };
