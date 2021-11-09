const contentSecurityPolicy = {
  'default-src': `self`,
  'font-src': `self`,
  'img-src': `self`,
  'script-src': `self`,
  'style-src': `self`,
  'frame-src': `self`,
};

module.exports = Object.entries(contentSecurityPolicy).map(([key, value]) => `${key} ${value}`).join(`; `);
