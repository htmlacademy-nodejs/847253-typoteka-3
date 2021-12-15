const handleMiddlewarePromiseRejection = (middleware) => (
  function (...args) {
    const middlewareReturn = middleware(...args);
    const next = args[args.length - 1];

    return Promise.resolve(middlewareReturn).catch(next);
  }
);

module.exports = {handleMiddlewarePromiseRejection};
