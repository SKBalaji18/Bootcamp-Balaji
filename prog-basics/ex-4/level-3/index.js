const { add } = require('../level-2/addition');
const { subtract } = require('../level-2/subtraction');
const { divide } = require('../level-2/division');
const logger = require('./logger');
const debug = require('debug')('compute'); // Set up a debug namespace for compute

// Parse arguments and validate
function parseArguments(args) {
    return args.map((arg) => {
        const num = parseFloat(arg);
        if (isNaN(num)) {
            logger.error(`Invalid input: "${arg}" is not a number.`);
            throw new Error(`Invalid input: "${arg}" is not a number.`);
        }
        return num;
    });
}

//we are dealing with readfile so we use async function
async function interactiveCompute() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Prompt the user for inputs
    rl.question('Enter operation (add, subtract, divide): ', (operation) => {
        rl.question('Enter numbers separated by spaces: ', (numbersInput) => {
            try {
                const numbers = parseArguments(numbersInput.split(' '));

                let result;
                switch (operation.toLowerCase()) {
                    case 'add':
                        result = add(numbers);
                        break;
                    case 'subtract':
                        result = subtract(numbers);
                        break;
                    case 'divide':
                        result = divide(numbers);
                        break;
                    default:
                        logger.error(`Invalid operation: "${operation}". Supported operations are add, subtract, and divide.`);
                        throw new Error(`Invalid operation: "${operation}". Supported operations are add, subtract, and divide.`);
                }

                debug(`Operation: ${operation}`);
                logger.info(`Result: ${result}`);

            } catch (error) {
                logger.error(`Error: ${error.message}`);
            } finally {
                rl.close(); // Close the interface after execution
            }
        });
    });
}

// Execute the interactive program
interactiveCompute();
