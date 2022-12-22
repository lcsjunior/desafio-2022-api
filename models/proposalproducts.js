'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProposalProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProposalProducts.belongsTo(models.Proposal, {
        foreignKey: 'proposalId',
      });
      ProposalProducts.belongsTo(models.Product, {
        foreignKey: 'productId',
      });
    }
  }
  ProposalProducts.init(
    {
      proposalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'ProposalProducts',
      timestamps: false,
    }
  );
  return ProposalProducts;
};
