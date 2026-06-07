var express = require("express");
var dotenv = require("dotenv");
const { getUser, createUser } = require("./controllers/user.controller");

dotenv.config();

var app = express();

let port = process.env.PORT;

app.get("/getUser", getUser);
app.post("/createUser", createUser);

app.listen(port, () => {
  console.log(`Listening to the port`);
});

// http://localhost:5001/api/v1/users/getUsers

// dsa - updates !!! 
