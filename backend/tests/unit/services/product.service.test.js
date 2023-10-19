const { expect } = require('chai');
const sinon = require('sinon');
const { allProductsFromModel, productIdFromModel } = require('../mocks/product.mock');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { SUCCESSFUL, NOT_FOUND, CREATED } = require('../../../src/utils/status');

describe('Realizando testes - PRODUCT SERVICE:', function () {
  it('Buscando todos os produtos com sucesso', async function () {
    sinon.stub(productModel, 'getAll').resolves(allProductsFromModel);
    const responseData = [
      { id: 1, name: 'Celular' },
      { id: 2, name: 'Computador' },
      { id: 3, name: 'Televisão' },
      { id: 4, name: 'Geladeira' },
    ];

    const responseService = await productService.getAll();
    expect(responseService.status).to.be.equal(SUCCESSFUL);
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.length(4);
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Buscando produto por id com sucesso', async function () {
    sinon.stub(productModel, 'getById').resolves(allProductsFromModel[0]);
    const responseData = { id: 1, name: 'Celular' };

    const responseService = await productService.getById(1);
    expect(responseService.status).to.be.equal(SUCCESSFUL);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Buscando produto por id inexistente', async function () {
    sinon.stub(productModel, 'getById').resolves(undefined);

    const responseService = await productService.getById(5);
    expect(responseService.status).to.be.equal(NOT_FOUND);
    expect(responseService.data.message).to.be.equal('Product not found');
  });

  it('Inserindo produto com sucesso', async function () {
    sinon.stub(productModel, 'insert').resolves(productIdFromModel);

    const inputData = { name: 'Microondas' };
    const responseService = await productService.insert(inputData.name);

    expect(responseService.status).to.be.equal(CREATED);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ id: 6, name: 'Microondas' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
