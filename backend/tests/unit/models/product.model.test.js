const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const {
  allProductsFromDb,
  allProductsFromModel,
  ProductByIdFromDb,
  ProductByIdFromModel,
  productIdFromDb,
  productIdFromModel,
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

  it('Adicionando produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productIdFromDb]);

    const inputData = { name: 'Geladeira' };
    const result = await productModel.insert(inputData.name);
    expect(result).to.be.equal(productIdFromModel);
  });

  it('Atualizando produto com sucesso', async function () {
    sinon.stub(connection, 'execute');

    const inputData = { id: 1, name: 'Geladeira' };
    await productModel.update(inputData.id, inputData.name);

    expect(connection.execute.calledOnce).to.be.equal(true);
  });

  it('Deletando produto com sucesso', async function () {
    sinon.stub(connection, 'execute');

    const inputData = 1;
    await productModel.deleteProduct(inputData);

    expect(connection.execute.calledOnce).to.be.equal(true);
  });

  it('Buscando pelo nome', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDb]);

    const inputData = 'Celular';

    const result = await productModel.getByName(inputData);

    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(allProductsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});