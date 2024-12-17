const { add } = require('./add');

function parseArguments(args) {
    return args.map((arg) => {
        const num = parseFloat(arg);
        if (isNaN(num)) {
            throw new Error(`Invalid input: "${arg}" is not a number.`);
        }
        return num;
    });
}

try {
    const args = process.argv.slice(2); // Get command-line arguments

    if (args.length === 0) {
        throw new Error('No numbers provided. Please pass numbers as arguments.');
    }

    const numbers = parseArguments(args); // Parse and validate arguments
    const result = add(numbers); // Calculate the sum

    console.log(`The sum of [${numbers.join(', ')}] is: ${result}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
