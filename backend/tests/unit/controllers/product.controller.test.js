const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = require('chai');

chai.use(sinonChai);

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { NOT_FOUND, SUCCESSFUL, NO_CONTENT } = require('../../../src/utils/status');
const { allProductsFromModel, createdProduct } = require('../mocks/product.mock');

describe('Realizando testes - PRODUCT CONTROLLER:', function () {
  it('Buscando todos os produtos com sucesso', async function () {
    sinon.stub(productService, 'getAll').resolves({ status: SUCCESSFUL, data: allProductsFromModel });

    const req = { params: {}, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsFromModel);
  });

  it('Buscando produto pelo id com sucesso', async function () {
    sinon.stub(productService, 'getById').resolves({ status: SUCCESSFUL, data: allProductsFromModel[0] });

    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsFromModel[0]);
  });

  it('Buscando produto por id inexistente', async function () {
    const serviceResponse = { status: NOT_FOUND, data: { message: 'Product not found' } };

    sinon.stub(productService, 'getById').resolves(serviceResponse);

    const req = { params: { id: 999 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

  it('Inserindo produto com sucesso', async function () {
    sinon.stub(productService, 'insert').resolves(createdProduct);

    const req = { params: {}, body: { name: 'Microondas' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.insert(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(createdProduct.data);
  });

  it('Atualizando produto com sucesso', async function () {
    sinon.stub(productService, 'update').resolves({ status: SUCCESSFUL, data: { id: 8, name: 'Geladeira' } });

    const req = { params: { id: 8 }, body: { name: 'Geladeira' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.update(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 8, name: 'Geladeira' });
  });

  it('Delete produto com sucesso', async function () {
    sinon.stub(productService, 'deleteProduct').resolves({ status: NO_CONTENT });

    const req = { params: { id: 8 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});