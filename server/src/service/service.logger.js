const winston = require('winston');
const applicationConfig = require('../config/config-loader');
const NODE_ENV = process.env.NODE_ENV;




module.exports = (module) => {

    if (!module) {
        throw new Exception("Module is necessary")
    }

    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'tv-series.log' })
        ],
        format: winston.format.combine(
            winston.format.label({ label: module }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.prettyPrint(),
            winston.format.splat(),
            winston.format.printf(({ timestamp, level, message, meta, label }) => {
                return `${timestamp} - ${label} - [${level.toUpperCase()}] - ${message}`
            })
        ),
        levels: winston.config.npm.levels
    });


    if (NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({}));
    }

    return logger
}