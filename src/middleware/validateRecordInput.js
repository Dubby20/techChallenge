import Joi from 'joi';

/**
* @description validate input fields
*@function validateRecordInput

* @returns {error} response
*/
const validateRecordInput = Joi.object({
  startDate: Joi.date()
    .required()
    .messages({
      'date.base': 'startDate must be a valid date in a YYYY-MM-DD format',
      'any.required': 'startDate is required',
    }),

  endDate: Joi.date()
    .required()
    .greater(Joi.ref('startDate'))
    .messages({
      'date.base': 'endDate must be a valid date in a YYYY-MM-DD format',
      'date.greater': 'endDate must be greater than startDate',
      'any.required': 'endDate is required',
    }),

  maxCount: Joi.number()
    .required()
    .strict()
    .greater(Joi.ref('minCount'))
    .messages({
      'number.base': 'maxCount must be numeric',
      'number.empty': 'Please enter the maxCount',
      'any.required': 'maxCount is required',
      'number.greater': 'maxCount must be greater than minCount',
    }),

  minCount: Joi.number()
    .required()
    .strict()
    .messages({
      'number.base': 'minCount must be numeric',
      'number.empty': 'Please enter the minCount',
      'any.required': 'minCount is required',
    }),
});

export default validateRecordInput;
