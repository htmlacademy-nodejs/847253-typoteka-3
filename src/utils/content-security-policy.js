const DEPRECATED_CONTENT_SECURITY_POLICY_DIRECTIVE_NAMES = [`block-all-mixed-content`, `plugin-types`, `referrer`];

class ContentSecurityPolicyDirectiveCheckError extends Error {}

class ContentSecurityPolicy {
  constructor(data = {}) {
    this.checkData(data);

    this._data = data;
  }

  set = (directive) => {
    this.checkDirective(directive);

    this._data[directive.name] = directive.value;
  }

  toString() {
    return Object.entries(this._data).map(([key, value]) => `${key} '${value}'`).join(`; `);
  }

  checkData(data) {
    Object.keys(data)
      .forEach((directiveName) => {
        if (DEPRECATED_CONTENT_SECURITY_POLICY_DIRECTIVE_NAMES.includes(directiveName)) {
          throw new ContentSecurityPolicyDirectiveCheckError(`Directive '${directiveName}' is deprecated`);
        }
      });
  }

  checkDirective({name}) {
    if (DEPRECATED_CONTENT_SECURITY_POLICY_DIRECTIVE_NAMES.includes(name)) {
      throw new ContentSecurityPolicyDirectiveCheckError(`Directive '${name}' is deprecated`);
    }
  }

  set data(data) {
    this.checkData(data);

    this._data = data;
  }
}

module.exports = ContentSecurityPolicy;
