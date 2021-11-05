class LogInfoError extends Error {}

class LogInfo {
  /**
   * @param {Object<string, *>} [data]
   * @param {string} [template]
   * @return {void}
   */
  constructor(data, template) {
    /**
     * @private
     * @type {Object<string, *> | undefined}
     */
    this._data = data;

    /**
     * @private
     * @type {string | undefined}
     */
    this._template = template;
  }

  /**
   * @public
   * @param {string} key
   * @param {*} value
   * @return {void}
   */
  set = (key, value) => {
    if (this._data === undefined) {
      this._data = {};
    }

    this._data[key] = value;
  }

  /**
   * @public
   * @return {string}
   */
  toString() {
    return this.compileTemplate();
  }

  /**
   * @private
   * @return {string}
   * @throws {LogInfoError}
   */
  compileTemplate() {
    if (this._template === undefined) {
      throw new LogInfoError(`No template`);
    }

    if (this._data === undefined) {
      throw new LogInfoError(`No data`);
    }

    return this._template.replace(new RegExp(`{{[a-zA-Z]+}}`, `gm`), (substring) => {
      const key = substring.slice(2, substring.length - 2);

      const value = this._data[key];

      if (value === undefined) {
        throw new LogInfoError(`No data for the '${key}' key`);
      }

      return typeof value === `object` ? JSON.stringify(this._data[key]) : this._data[key];
    });
  }

  /**
   * @param {string} template
   * @return {void}
   */
  set template(template) {
    this._template = template;
  }

  /**
   * @param {Object<string, *>} data
   * @return {void}
   */
  set data(data) {
    this._data = data;
  }
}

module.exports = LogInfo;
