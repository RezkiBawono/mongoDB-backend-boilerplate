const { createLogger, transports, format } = require("winston");
const { v4: uuid } = require("uuid");
const path = require("path");

const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, "..", "logs", "reqLog.log"),
      format: format.combine(
        format.timestamp({ format: "yyyyMMdd\tHH:mm:ss" }),
        format.printf(
          ({ timestamp, message }) => `${timestamp}\t${uuid()}\t${message}\n`
        )
      ),
    }),
  ],
});

const middlewareLogger = (req, res, next) => {
  logger.info(`${req.method}\t${req.url}\t${req.headers.origin}`);
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, middlewareLogger };
