const debug = require('debug')('division'); // Set up a debug namespace for division

function divide(numbers) {
    if (numbers.includes(0)) {
        debug('Error: Division by zero');
        throw new Error('Cannot divide by zero');
    }
    debug(`Dividing numbers: ${numbers.join(', ')}`);
    return numbers.reduce((result, num) => result / num); // Divide all numbers
}

module.exports = { divide };
