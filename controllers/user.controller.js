const { compare } = require("bcrypt");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
function getUser(request, response) {
  console.log(request.meranaam);
  User.find({})
    .then((res) => {
      response.json({ message: "Users!!!!!", data: res });
    })
    .catch((error) => {
      console.log(error);
    });
}

function createUser(request, response) {
  User.create(request.body)
    .then((res) => {
      response.json({ message: "User is registered!!!" });
    })
    .catch((error) => {
      response.json({ message: "Something went wrong!!!", error: error });
    });
}
async function signIn(request, response) {
  try {
    let { email, password, role } = request.body;
    if (!email || !password) {
      return response
        .status(401)
        .json({ message: "email or password is missing" });
    }
    let user = await User.findOne({ email: email });
    if (!user) {
      return response.json({
        message: "user does not exists, kindly check the email",
      });
    }
    let comparePassword = await user.comparePassword(password);
    if (!comparePassword) {
      return response.json({ message: "Wrong Password" });
    }
    let token = await jwt.sign(request.body, process.env.JWT_SCREET);
    response.cookie("token", token);
    response.status(200).json({ message: "Login Success!!" });
  } catch (error) {
    response.status(500).json({ message: "Something!!!" });
  }
}
module.exports = { getUser, createUser, signIn };
