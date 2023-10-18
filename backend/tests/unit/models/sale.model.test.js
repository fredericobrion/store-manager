// const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

describe('Realizando testes - SALE MODEL:', function () {
  it('Buscando todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves();
  });
});