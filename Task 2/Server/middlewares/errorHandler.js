const errorHandler = (err, req, res, next) => {
  if (err.name === "Unauthorized" || err.name === "JsonWebTokenError") {
    res.status(403).json({ message: "Invalid username / password" });
  } else if (err.name === "MalformedJWT") {
    res.status(403).json({ message: "Invalid Token" });
  } else if (err.name === "InvalidRefreshToken") {
    res.status(403).json({ message: "Invalid Refresh Token" });
  } else if (
    err.name === "ExpiredRefreshToken" ||
    err.name === "EmptyRefreshToken" ||
    err.name === "EmptyAccessToken"
  ) {
    res.status(403).json({ message: "Please Relog-in" });
  } else if (err.name === "SequelizeValidationError") {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "UsernameRequired") {
    res.status(400).json({ message: "Username is required" });
  } else if (err.name === "PasswordRequired") {
    res.status(400).json({ message: "Password is required" });
  } else if (err.name === "ExpiredToken") {
    res.status(401).json({ message: "Access Token was expired" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
