const debug = require('debug')('addition'); // Set up a debug namespace for addition

function add(numbers) {
    debug(`Adding numbers: ${numbers.join(', ')}`);
    return numbers.reduce((sum, num) => sum + num, 0);  // Sum all numbers
}

module.exports = { add };
