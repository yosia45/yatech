const {
  readPayloadFromToken,
  readRefreshToken,
  generateToken,
} = require("../helpers/jwt");
const { User } = require("../models");

const authn = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = readPayloadFromToken(access_token);
    console.log(payload, "<<< dari authn");
    if (payload === "jwt malformed" || payload === "invalid token") {
      throw { name: "MalformedJWT" };
    }
    if (payload === "jwt expired") {
      const findRefreshToken = await User.findOne({
        where: { id: payload.id },
      });
      console.log(findRefreshToken);
      if (findRefreshToken.refreshToken === null) {
        throw { name: "EmptyRefreshToken" };
      }
      const payloadRefreshToken = readRefreshToken(
        findRefreshToken.refreshToken
      );
      // console.log(payloadRefreshToken, "<<<<payload Refresh Token");
      if (
        payloadRefreshToken === "jwt malformed" ||
        payloadRefreshToken === "invalid token"
      ) {
        throw { name: "InvalidRefreshToken" };
      } else if (payloadRefreshToken === "jwt expired") {
        throw { name: "ExpiredRefreshToken" };
      }
      const newAccessToken = generateToken({
        id: findRefreshToken.id,
        username: findRefreshToken.username,
      });
      res.status(200).json({
        access_token: newAccessToken,
      });
    }
    const user = await User.findOne({
      where: {
        username: payload.username,
      },
    });
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = {
      username: user.username,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authn;
