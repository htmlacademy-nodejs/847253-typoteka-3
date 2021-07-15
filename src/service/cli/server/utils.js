'use strict';

const createResponseSender = (res) => (statusCode, message) => {
  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });
  res.end(message);
};

const createMessageTemplate = (body) => (
  `<!Doctype html>
      <html lang="ru">
      <head>
        <title>Типотека</title>
      </head>
      <body>${body}</body>
    </html>`
);

const createPostListTemplate = (posts) => {
  const listItems = posts.map((post) => `<li>${post.title}</li>`).join(``);

  return `<ul>${listItems}</ul>`;
};

module.exports = {
  createResponseSender,
  createMessageTemplate,
  createPostListTemplate,
};
