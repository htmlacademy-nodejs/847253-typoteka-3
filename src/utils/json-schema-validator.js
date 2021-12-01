const Ajv = require(`ajv`);

class JsonSchemaValidatorValidationError extends Error {}
class JsonSchemaValidatorSchemaCompilationError extends Error {}

class JsonSchemaValidator {
  static instance = null;

  constructor() {
    if (JsonSchemaValidator.instance !== null) {
      return JsonSchemaValidator.instance;
    }

    this.ajv = new Ajv({allErrors: true});
  }

  validate(schema, data) {
    let validate;

    try {
      validate = this.ajv.compile(schema);
    } catch (error) {
      throw new JsonSchemaValidatorSchemaCompilationError(error.message);
    }

    const isValid = validate(data);

    if (!isValid) {
      throw new JsonSchemaValidatorValidationError(validate.errors.map(
          ({instancePath, message}) => (
            instancePath ? `Field '${instancePath}' ${message}` : `${message[0].toUpperCase()}${message.slice(1)}`
          )
      ).join(`; `));
    }

    return true;
  }
}

module.exports = {JsonSchemaValidator, JsonSchemaValidatorValidationError};
