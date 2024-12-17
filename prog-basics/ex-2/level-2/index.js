const args = process.argv.slice(2);

if (args.includes("--help")) {
    console.log(`
Usage:
  node index.js [--multiply] <numbers>

Options:
  --multiply  Multiply the numbers instead of adding them
  --help      Show this help message
`);
    process.exit(0);
}

if (args.length === 0) {
    console.error("Please provide numbers as arguments.");
    process.exit(1);
}

// here we are checking there is the multiply flag is present or not if present we need to multiply otherwise we need to add
const isMultiply = args.includes("--multiply");
const numbers = args.filter((arg) => arg !== "--multiply");


try {
    const result = numbers.reduce((acc, arg) => {
        const num = parseFloat(arg);
        if (isNaN(num)) {
            throw new Error(`Invalid number: ${arg}`);
        }
        return isMultiply ? acc * num : acc + num; // if multiply is true multiplication will happen
    }, isMultiply ? 1 : 0); // if multiply is true acc will be 1

    console.log(`${isMultiply ? "Product" : "Sum"}: ${result}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}