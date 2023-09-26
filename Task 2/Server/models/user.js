'use strict';
const {
  Model
} = require('sequelize');
const { generateHash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username:{
      type: DataTypes.STRING,
      allowNull:false,
      unique: {msg:"Username already registered, use another username"},
      validate:{
        notNull:{msg:"Username is required"},
        notEmpty:{msg:"Username is required"},
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Password is required"},
        notEmpty:{msg:"Password is required"},
      }
    },
    refreshToken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    instance.password = generateHash(instance.password);
  });
  return User;
};