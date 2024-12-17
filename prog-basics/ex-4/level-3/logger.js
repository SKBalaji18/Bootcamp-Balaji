const winston = require('winston');

// Creating a logger instance
const logger = winston.createLogger({
    level: 'info', 
    
    format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            winston.format.printf(
                ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
            )
        ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
    ],
});

module.exports = logger;
