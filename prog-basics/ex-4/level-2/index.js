const { add } = require('./addition');
const { subtract } = require('./subtraction');
const { divide } = require('./division');

function parseArguments(args) {
    return args.map((arg) => {
        const num = parseFloat(arg);
        if (isNaN(num)) {
            throw new Error(`Invalid input: "${arg}" is not a number.`);
        }
        return num;
    });
}

function main() {
    try {
        const args = process.argv.slice(2); // Extract command-line arguments

        if (args.length < 2) {
            throw new Error('Usage: node index.js <operation> <num1> <num2> ...');
        }

        const operation = args[0];
        const numbers = parseArguments(args.slice(1)); // Parse and validate all numbers

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
                throw new Error(`Invalid operation: "${operation}". Supported operations are add, subtract, and divide.`);
        }

        console.log(`Result: ${result}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();
