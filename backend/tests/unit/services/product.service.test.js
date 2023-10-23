const { expect } = require('chai');
const sinon = require('sinon');
const { allProductsFromModel, productIdFromModel } = require('../mocks/product.mock');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { SUCCESSFUL, NOT_FOUND, CREATED, NO_CONTENT } = require('../../../src/utils/status');
const { validateName } = require('../../../src/middlewares/product.middlewares');
const { createProductSchema } = require('../../../src/services/validations/productSchema');

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

  it('Testa se o middleware de validação de nome aponta erro quando o campo nome não é enviado', async function () {
    const req = { body: { nam: 'Celular' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(createProductSchema, 'validate').returns({ error: { message: 'name is required' } });

    await validateName(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'name is required' });
  });

  it('Testa se o middleware de validação de nome aponta erro quando o nome tem menos de 5 caracteres', async function () {
    const req = { body: { nam: 'cel' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(createProductSchema, 'validate').returns({ error: { message: 'name length must be at least 5 characters long' } });

    await validateName(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: 'name length must be at least 5 characters long' });
  });

  it('Testa se o middleware de validação de nome aceita nomes corretos', async function () {
    const req = { body: { name: 'Celular' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await validateName(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Atualizando produto com sucesso', async function () {
    sinon.stub(productModel, 'update').resolves();

    const inputData = { name: 'Microondas' };
    const responseService = await productService.update(6, inputData.name);

    expect(responseService.status).to.be.equal(SUCCESSFUL);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ id: 6, name: 'Microondas' });
  });

  it('Deletando produto com sucesso', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves();

    const responseService = await productService.deleteProduct(6);

    expect(responseService.status).to.be.equal(NO_CONTENT);
  });

  afterEach(function () {
    sinon.restore();
  });
});
