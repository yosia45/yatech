const jwt = require("jsonwebtoken");
const accessTokenSecretKey = process.env.JWT_ACCESS_TOKEN;
const refreshTokenSecretKey = process.env.JWT_REFRESH_TOKEN;

const generateToken = (payload) => {
  return jwt.sign(payload, accessTokenSecretKey, { expiresIn: "2m" });
};
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshTokenSecretKey, { expiresIn: "60m" });
};
const readPayloadFromToken = (token) => {
  return jwt.verify(token, accessTokenSecretKey, (err, decoded) => {
    if (err) {
      if (err.message === "jwt expired") {
        console.log("Expired Token");
        const expiredPayload = jwt.verify(token, accessTokenSecretKey, {
          ignoreExpiration: true,
        });
        return expiredPayload;
      } else if (err.message === "jwt must be provided") {
        throw { name: "EmptyAccessToken" };
      } else {
      }
      console.log(err, "dari jwt");
      return err.message;
    } else {
      return decoded;
    }
  });
};
const readRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenSecretKey, (err, decoded) => {
    if (err) {
      return err.message;
    } else {
      return decoded;
    }
  });
};

module.exports = {
  generateToken,
  readPayloadFromToken,
  generateRefreshToken,
  readRefreshToken,
};
