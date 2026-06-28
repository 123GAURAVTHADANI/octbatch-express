const { response } = require("express");
let jwt = require("jsonwebtoken");
function ageCheckMiddleware(req, res, next) {
  let age = req.query.age;
  if (!(age >= 18)) {
    return res.json({ message: "Ghar Jao!!!" });
  }
  next();
}

function adhaarCardCheckMiddleware(req, res, next) {
  let adhaar = req.query.adhaar;
  if (!adhaar) {
    return res.json({ message: "Adhaar is not eligible" });
  }
  next();
}
async function isAuthorized(req, res, next) {
  let token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Login is not done" });
  }
  let decoded = await jwt.verify(token, process.env.JWT_SCREET);
  if (!decoded) {
    return response.json({ message: "Not verified user" });
  }
  req.user = decoded;
  next();
}

function authorize(...roles) {
  return (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      return response.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

module.exports = {
  ageCheckMiddleware,
  adhaarCardCheckMiddleware,
  isAuthorized,
  authorize,
};
