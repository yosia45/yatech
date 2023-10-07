const { User } = require("../models");
const { generateToken, generateRefreshToken } = require("../helpers/jwt");
const { verifyHash } = require("../helpers/bcrypt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, password } = req.body;
      const newUser = await User.create({
        username,
        password,
      });

      res.status(201).json({
        message: "Account has been created",
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw { name: "UsernameRequired" };
      }
      if (!password) {
        throw { name: "PasswordRequired" };
      }
      const foundUser = await User.findOne({
        where: {
          username,
        },
      });
      if (!foundUser) {
        throw { name: "Unauthorized" };
      }

      const matchedPassword = verifyHash(password, foundUser.password);

      if (!matchedPassword) {
        throw { name: "Unauthorized" };
      }

      const payload = {
        id: foundUser.id,
        username: foundUser.username,
      };
      const token = generateToken(payload);
      const refreshToken = generateRefreshToken(payload);

      const updatedRefreshToken = await User.update(
        { refreshToken: refreshToken },
        {
          where: {
            id: foundUser.id,
          },
        }
      );

      res.status(200).json({
        username: foundUser.username,
        access_token: token,
        refreshToken: refreshToken,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
  static async logout(req,res,next){
    try {
      
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController;
