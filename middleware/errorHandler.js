const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  const errorMessage = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  logger.error(errorMessage);
  console.error(err.stack);

  const status = res.statusCode || 500;
  const message = err.message || STATUS_CODES[status];

  res.status(status);
  res.json({ message });
};

module.exports = errorHandler;
