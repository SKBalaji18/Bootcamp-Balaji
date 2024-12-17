const yaml = require('js-yaml');
const fs = require('fs');

// Get the current environment (default to 'development' if not set)
const environment = process.env.NODE_ENV || 'development';

try {
    // Load the appropriate configuration file
    const configPath = `config/${environment}.yaml`;
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    // Use configuration values
    console.log(`Environment: ${environment}`);
    console.log("Database Host:", config.database.host);
    console.log("App Debug Mode:", config.app.debug);
} catch (error) {
    console.error("Error loading configuration:", error);
}
