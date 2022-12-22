'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proposal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Proposal.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client',
        allowNull: false,
      });
    }
  }
  Proposal.init(
    {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Proposal',
      paranoid: true,
    }
  );
  return Proposal;
};
