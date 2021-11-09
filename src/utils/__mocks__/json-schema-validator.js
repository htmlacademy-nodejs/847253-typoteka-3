class JsonSchemaValidatorValidationErrorMock extends Error {}

class JsonSchemaValidatorMock {}

JsonSchemaValidatorMock.prototype.validate = jest.fn();

module.exports = {
  JsonSchemaValidator: JsonSchemaValidatorMock,
  JsonSchemaValidatorValidationError: JsonSchemaValidatorValidationErrorMock,
};
