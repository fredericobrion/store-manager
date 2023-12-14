# Projeto Store Manager
O projeto Store Manager é uma API de sistema de gerenciamento de vendas.

## Tecnologias utilizadas
- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">JavaScript</a>
- <a href="https://www.docker.com/" target="_blank">Docker</a>
- <a href="https://expressjs.com/" target="_blank">Express</a>
- <a href="https://joi.dev/">Joi</a>
- <a href="https://www.mysql.com/" target="_blank">MySQL</a>
- <a href="https://mochajs.org/" target="_blank">Mocha</a>
- <a href="https://www.chaijs.com/" target="_blank">Chai</a>
- <a href="https://sinonjs.org/" target="_blank">Sinon</a>
- <a href="https://nodemon.io/" target="_blank">Nodemon</a>

## Como utilizar
- Clone o repositório e entre no diretório
```
git clone git@github.com:fredericobrion/store-manager.git && cd store-manager
```
- Instale as dependências com o comando ```npm instal```.
- Inicie os containers 'backend' e 'db' com ```docker-compose up -d```.

## Funcionalidades
1) Endpoint ```/products``` para os produtos:
   - ```GET /products``` retorna todos os produtos.
   - ```GET /products/:id``` retorna um produto.
   - ```POST /products``` para cadastrar um produto. Espera receber no corpo da requisição um ```name``` válido.
   - ```PUT /products/:id``` para atualizar um produto. Espera receber no corpo da requisição um ```name``` válido.
   - ```DELETE /products/:id``` para deletar um produto.
   - ```GET /products/search``` para pesquisar produtos pelo nome. O query params da requisição deverá seguir o formato abaixo:
     
    ```
    http://localhost:PORT/products/search?q=Martelo
    ```
  
2) Endpoint ```/sales``` para as vendas:
  - ```GET /sales``` retorna todas as vendas.
  - ```GET /sales/:id``` retorna uma venda.
  - ```POST /sales``` para cadastrar uma venda. O corpo da requisição deverá seguir o formato abaixo:
  ```
  [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
  ```
  - ```DELETE /sales/:id``` para deletar uma venda.
  - ```PUT /sales/:saleId/products/:productId/quantity``` para atualizar a quantidade de produtos em uma venda. Espera receber no corpo da requisição um ```quantity``` maior do que 0.
