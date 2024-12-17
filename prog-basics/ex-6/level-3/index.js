const yaml = require('js-yaml');
const fs = require('fs');

// Get the current environment
const environment = process.env.NODE_ENV || 'development';

try {
    // Load configuration
    const configPath = `config/${environment}.yaml`;
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    // Setup logging
    const log = (message, level) => {
        const levels = { debug: 0, info: 1, warn: 2, error: 3 };
        const currentLevel = levels[config.logging.level] || 0;
        if (levels[level] >= currentLevel) console.log(`[${level.toUpperCase()}] ${message}`);
    };

    log(`Loaded configuration for environment: ${environment}`, 'debug');

    // Dynamically load and execute commands
    config.commands.forEach((command) => {
        const { name, function: funcName, file } = command;
        log(`Loading function ${funcName} from file ${file} for command ${name}`, 'debug');

        try {
            const functions = require(`./${file}`);
            if (typeof functions[funcName] === 'function') {
                log(`Executing ${name} with input 0.5`, 'info');
                const result = functions[funcName](0.5); // Example input
                log(`Result of ${name}: ${result}`, 'info');
            } else {
                log(`Function ${funcName} not found in ${file}`, 'error');
            }
        } catch (error) {
            log(`Error loading file ${file}: ${error.message}`, 'error');
        }
    });
} catch (error) {
    console.error("Error loading configuration:", error);
}
