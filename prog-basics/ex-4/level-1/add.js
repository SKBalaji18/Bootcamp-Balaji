const debug = require('debug')('add'); // Set up a debug namespace

function add(numbers) {
    debug(`Calculating the sum of: ${numbers}`);
    return numbers.reduce((sum, num) => sum + num, 0);
}

module.exports = { add };