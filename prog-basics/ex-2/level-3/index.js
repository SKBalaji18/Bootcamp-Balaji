#!/usr/bin/env node

const { add, multiply } = require("./mathutils");
const args = process.argv.slice(2);

if (args.includes("--help")) {
    console.log(`
Usage:
  command <operation> <numbers>

Operations:
  add       Add the numbers
  multiply  Multiply the numbers
  --help    Show this help message
`);
    process.exit(0);
}

const [operation, ...operands] = args;

if (!operation || operands.length === 0) {
    console.error("Error: Please provide an operation (add/multiply) and numbers.");
    process.exit(1);
}

try {
    const numbers = operands.map((arg) => {
        const num = parseFloat(arg);
        if (isNaN(num)) {
            throw new Error(`Invalid number: ${arg}`);
        }
        return num;
    });

    switch (operation.toLowerCase()) {
        case 'add':
            console.log(`Result of addition: ${add(numbers)}`);
            break;
        case 'multiply':
            console.log(`Result of multiplication: ${multiply(numbers)}`);
            break;
        default:
            throw new Error(`Error: Unknown operation "${operation}". Use 'add' or 'multiply'.`);
    }

} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}