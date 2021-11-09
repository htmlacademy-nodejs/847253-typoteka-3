const Ajv = require(`ajv`);

class JsonSchemaValidatorValidationError extends Error {}
class JsonSchemaValidatorSchemaCompilationError extends Error {}

/**
 * @typedef AjvValidationError
 * @type {Object}
 *
 * @property {string} message
 * @property {string} instancePath
 */

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
   * @param {Object} schema
   * @param {*} data
   * @return {boolean}
   */
  validate(schema, data) {
    /**
     * @readonly
     * @type {function(data: *): boolean | undefined}
     *
     * @property {AjvValidationError[]} errors
     */
    let validate;

    try {
      validate = this.ajv.compile(schema);
    } catch (error) {
      throw new JsonSchemaValidatorSchemaCompilationError(error.message);
    }

    /**
     * @type {boolean}
     */
    const isValid = validate(data);

    if (!isValid) {
      throw new JsonSchemaValidatorValidationError(validate.errors.map(
          /**
           * @param {AjvValidationError} error
           * @return {string}
           */
          ({instancePath, message}) => instancePath ? `Field '${instancePath}' ${message}` : `${message[0].toUpperCase()}${message.slice(1)}`
      ).join(`; `));
    }

    return true;
  }
}

module.exports = {JsonSchemaValidator, JsonSchemaValidatorValidationError};
