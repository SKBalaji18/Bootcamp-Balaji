const yaml = require('js-yaml');
const fs = require('fs');

try {
    // Load the YAML file
    const config = yaml.load(fs.readFileSync('default.yaml', 'utf8'));

    // Access and use configuration values
    console.log("Database Host:", config.database.host);
    console.log("App Debug Mode:", config.app.debug);
} catch (error) {
    console.error("Error loading configuration:", error);
}
