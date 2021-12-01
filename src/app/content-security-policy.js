const ContentSecurityPolicy = require(`@root/src/utils/content-security-policy`);

const contentSecurityPolicy = new ContentSecurityPolicy({
  'default-src': `self`,
  'font-src': `self`,
  'img-src': `self`,
  'script-src': `self`,
  'style-src': `self`,
  'frame-src': `self`,
});

module.exports = contentSecurityPolicy;
