const Ajv = require(`ajv`);

const LoggedError = require(`@root/src/utils/logged-error`);

class JsonSchemaValidatorValidationError extends LoggedError {}

class JsonSchemaValidator {
  /**
   * @type {JsonSchemaValidator | null}
   */
  static instance = null;

  /**
   * @return {JsonSchemaValidator | void}
   */
  constructor() {
    if (JsonSchemaValidator.instance !== null) {
      return JsonSchemaValidator.instance;
    }

    this.ajv = new Ajv({allErrors: true});
  }

  /**
   * @param {object} schema
   * @param {object} data
   * @return {boolean}
   */
  validate(schema, data) {
    const validate = this.ajv.compile(schema);

    const isValid = validate(data);

    if (!isValid) {
      throw new JsonSchemaValidatorValidationError(validate.errors.map(
          /**
           * @param {Object} error
           * @return {string}
           */
          ({instancePath, message}) => instancePath ? `Field '${instancePath}' ${message}` : `${message[0].toUpperCase()}${message.slice(1)}`
      ).join(`; `));
    }

    return true;
  }
}

module.exports = {JsonSchemaValidator, JsonSchemaValidatorValidationError};
