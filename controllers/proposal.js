const { Proposal, ProposalProducts } = require('../models');

const list = async (req, res, next) => {};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const newProposal = await Proposal.create({
      clientId: body.clientId,
    });
    await ProposalProducts.bulkCreate(
      body.products.map((productId) => ({
        proposalId: newProposal.id,
        productId,
      }))
    );
    res.status(201).json(newProposal);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {};

const remove = async (req, res, next) => {};

module.exports = {
  list,
  create,
  update,
  remove,
};
