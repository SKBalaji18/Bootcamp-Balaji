const winston = require("winston");

// Create the logger
const logger = winston.createLogger({
    level: "info",
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
    },
    format: winston.format.combine(
        winston.format.printf(
            ({ level, message }) => `${level}: ${message}`
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


// Functions
const divide = (a, b) => {
    logger.info("Divide function called.");
    if (a < b) {
        logger.error(`Division error: Numerator (${a}) is less than denominator (${b}).`);
        throw new Error(`Cannot divide: Numerator (${a}) is less than denominator (${b}).`);
    }

    if (b === 0) {
        logger.error("Division by zero encountered!");
        throw new Error("Cannot divide by zero.");
    }
    const result = a / b;
    logger.info("Division successful.");
    return result;
};


const args = process.argv.slice(2);

if (args.length < 2) {
    logger.error("Insufficient arguments. Provide two numeric values.");
    console.error("Usage: node app.js <number1> <number2>");
    process.exit(1);
}

try {
    const [arg1, arg2] = args;
    const num1 = parseFloat(arg1);
    const num2 = parseFloat(arg2);

    if (isNaN(num1) || isNaN(num2)) {
        throw new Error(`Invalid input(s): "${arg1}" or "${arg2}" is not a number.`);
    }

    const result = divide(num1, num2);
    console.log("Result:", result);
} catch (error) {
    logger.error(error.message);
    process.exit(1);
}

logger.info("Program finished.");
