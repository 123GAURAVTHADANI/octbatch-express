function getUser(req, res) {
  res.send("PONG!!");
}
function createUser(req, res) {
  res.json({ message: "user created successfully!!!" });
}
module.exports = { getUser, createUser };
