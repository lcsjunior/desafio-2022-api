'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const attributes = Object.assign({}, this.get());
      for (const i of ['password']) {
        delete attributes[i];
      }
      return attributes;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    comparePassword(password) {
      if (this.password) {
        return bcrypt.compare(password, this.password);
      }
      return false;
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [6],
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [6],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
    }
  );
  User.beforeSave(async (user, options) => {
    if (user.password) {
      const hash = await bcrypt.hash(user.password, saltRounds);
      user.password = hash;
    }
  });
  return User;
};
