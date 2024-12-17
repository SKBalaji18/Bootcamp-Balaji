require('dotenv').config();

// Utility function to get environment variables with fallback and warnings
function getEnvVar(key, fallback) {
  const value = process.env[key];
  if (!value) {
    console.warn(`Warning: Environment variable ${key} is missing. Using fallback value: ${fallback}`);
    return fallback;
  }
  return value;
}

// Access environment variables with fallbacks
const port = getEnvVar('PORT', 3000);
const dbHost = getEnvVar('DB_HOST', 'localhost');
const dbUser = getEnvVar('DB_USER', 'root');
const dbPass = getEnvVar('DB_PASS', 'password123');

console.log(`Server is configured to run on port: ${port}`);
console.log(`Database host: ${dbHost}`);
console.log(`Database user: ${dbUser}`);

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Server running on port ${port}\nDatabase Host: ${dbHost}\nDatabase User: ${dbUser}`);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
