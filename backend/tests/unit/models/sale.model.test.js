const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const {
  allSalesFromDb,
  allSalesFromModel,
  salesByIdFromDb,
  salesByIdFromModel,
  saleIdFromDb,
  saleIdFromModel,
  saleToInsert,
} = require('../mocks/sale.mock');
const { saleModel } = require('../../../src/models');

describe('Realizando testes - SALE MODEL:', function () {
  it('Buscando todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDb]);

    const sales = await saleModel.getAll();

    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(4);
    expect(sales).to.deep.equal(allSalesFromModel);
  });

  it('Buscando venda pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesByIdFromDb]);

    const inputData = 1;
    const result = await saleModel.getById(inputData);

    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(salesByIdFromModel);
  });

  it('Adicionando venda com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0).resolves([saleIdFromDb])
      .onCall(1)
      .resolves();

    const result = await saleModel.insert(saleToInsert);
    expect(result).to.be.equal(saleIdFromModel);
  });

  it('Deletando venda com sucesso', async function () {
    sinon.stub(connection, 'execute');

    const inputData = 1;
    await saleModel.deleteSale(inputData);

    expect(connection.execute.calledOnce).to.be.equal(true);
  });

  it('Buscando pelo id e retornando id da venda junto', async function () {
    sinon.stub(connection, 'execute').resolves([salesByIdFromDb]);

    const inputData = 1;
    const result = await saleModel.getByIdWithSaleId(inputData);

    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(salesByIdFromDb);
  });

  it('Atualizando venda com sucesso', async function () {
    sinon.stub(connection, 'execute');

    const inputData = [1, 1, 2];
    await saleModel.updateSale(...inputData);

    expect(connection.execute.calledOnce).to.be.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});