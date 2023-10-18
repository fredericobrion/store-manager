const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const {
  allProductsFromDb,
  allProductsFromModel,
  ProductByIdFromDb,
  ProductByIdFromModel,
} = require('../mocks/product.mock');
const { productModel } = require('../../../src/models');

describe('Realizando testes - PRODUCT MODEL:', function () {
  it('Buscando todos os produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDb]);

    const products = await productModel.getAll();

    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(4);
    expect(products).to.deep.equal(allProductsFromModel);
  });

  it('Buscando produto pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[ProductByIdFromDb]]);

    const inputData = 1;
    const result = await productModel.getById(inputData);

    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal(ProductByIdFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});