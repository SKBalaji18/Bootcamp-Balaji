const debug = require('debug')('subtraction'); // Set up a debug namespace for subtraction

function subtract(numbers) {
    debug(`Subtracting numbers: ${numbers.join(', ')}`);
    return numbers.reduce((result, num) => result - num); // Subtract all numbers
}

module.exports = { subtract };
