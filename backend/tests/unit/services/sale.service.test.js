const { expect } = require('chai');
const sinon = require('sinon');
const { SUCCESSFUL, NOT_FOUND, CREATED } = require('../../../src/utils/status');
const { saleModel } = require('../../../src/models');
const { allSalesFromModel, saleIdFromModel, saleToInsert } = require('../mocks/sale.mock');
const { saleService } = require('../../../src/services');
const { validateSaleInput } = require('../../../src/middlewares/sale.middlewares');
const { createSaleSchema } = require('../../../src/services/validations/saleSchema');

describe('Realizando testes - SALE SERVICE:', function () {
  it('Buscando todas as vendas com sucesso', async function () {
    sinon.stub(saleModel, 'getAll').resolves(allSalesFromModel);

    const responseData = [
      {
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
      {
        saleId: 1,
        date: '2021-12-09T04:54:54.000Z',
        productId: 2,
        quantity: 2,
      },
      {
        saleId: 2,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
      {
        saleId: 3,
        date: '2021-10-09T04:54:54.000Z',
        productId: 2,
        quantity: 2,
      },
    ];

    const responseService = await saleService.getAll();
    expect(responseService.status).to.be.equal(SUCCESSFUL);
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.length(4);
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Buscando venda por id com sucesso', async function () {
    const saleFromModelById = [
      {
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
      {
        date: '2021-12-09T04:54:54.000Z',
        productId: 2,
        quantity: 2,
      },
    ];

    sinon.stub(saleModel, 'getById').resolves(saleFromModelById);

    const responseData = [
      {
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
      {
        date: '2021-12-09T04:54:54.000Z',
        productId: 2,
        quantity: 2,
      },
    ];

    const responseService = await saleService.getById(1);
    expect(responseService.status).to.be.equal(SUCCESSFUL);
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Buscando venda por id inexistente', async function () {
    sinon.stub(saleModel, 'getById').resolves([]);

    const responseService = await saleService.getById(99);
    expect(responseService.status).to.be.equal(NOT_FOUND);
    expect(responseService.data.message).to.be.equal('Sale not found');
  });

  it('Inserindo venda com sucesso', async function () {
    sinon.stub(saleModel, 'insert').resolves(saleIdFromModel);

    const responseService = await saleService.insert(saleToInsert);

    expect(responseService.status).to.be.equal(CREATED);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ id: 6, itemsSold: saleToInsert });
  });

  it('Testa se o middleware de validação de entrada aponta erro quando o campo quantity não é enviado', async function () {
    const req = { body: [{ productId: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(createSaleSchema, 'validate').returns({ error: { message: 'quantity is required' } });

    await validateSaleInput(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'quantity is required' });
  });

  afterEach(function () {
    sinon.restore();
  });
});