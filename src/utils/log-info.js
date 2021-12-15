class LogInfoError extends Error {}

class LogInfo {
  constructor(data, template) {
    this._data = data;

    this._template = template;
  }

  set = (key, value) => {
    if (this._data === undefined) {
      this._data = {};
    }

    this._data[key] = value;
  }

  toString() {
    return this.compileTemplate();
  }

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

  set template(template) {
    this._template = template;
  }

  set data(data) {
    this._data = data;
  }
}

module.exports = LogInfo;
