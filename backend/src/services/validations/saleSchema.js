const Joi = require('joi');

const createSaleSchema = Joi.object({
  productId: Joi.number()
    .required()
    .label('productId'),
  quantity: Joi.number()
    .required()
    .min(1)
    .label('quantity'),
}).messages({
  'number.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
});

module.exports = {
  createSaleSchema,
};