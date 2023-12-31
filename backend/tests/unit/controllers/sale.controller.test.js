const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = require('chai');

chai.use(sinonChai);

const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { NOT_FOUND, SUCCESSFUL, CREATED, NO_CONTENT } = require('../../../src/utils/status');
const { allSalesFromDb, salesByIdFromDb, saleToInsert } = require('../mocks/sale.mock');

describe('Realizando testes - SALE CONTROLLER:', function () {
  it('Buscando todas as vendas com sucesso', async function () {
    sinon.stub(saleService, 'getAll').resolves({ status: SUCCESSFUL, data: allSalesFromDb });

    const req = { params: {}, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesFromDb);
  });

  it('Buscando venda pelo id com sucesso', async function () {
    sinon.stub(saleService, 'getById').resolves({ status: SUCCESSFUL, data: salesByIdFromDb });

    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesByIdFromDb);
  });

  it('Buscando produto por id inexistente', async function () {
    sinon.stub(saleService, 'getById').resolves({ status: NOT_FOUND, data: { message: 'Sale not found' } });

    const req = { params: { id: 999 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Adicionando venda com sucesso', async function () {
    sinon.stub(saleService, 'insert').resolves({ status: CREATED, data: { id: 6, itemsSold: saleToInsert } });
    
    const req = { params: {}, body: saleToInsert };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await saleController.insert(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 6, itemsSold: saleToInsert });
  });

  it('Delete de venda com sucesso', async function () {
    sinon.stub(saleService, 'deleteSale').resolves({ status: NO_CONTENT });

    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });
  
  afterEach(function () {
    sinon.restore();
  });
});