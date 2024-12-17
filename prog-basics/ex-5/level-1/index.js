// Load environment variables from .env file
require('dotenv').config();

// Access environment variables
const port = process.env.PORT || 3001; 
const dbHost = process.env.DB_HOST || 'localhost-1'; 

console.log(`Server is running on port ${port}`);
console.log(`Database host: ${dbHost}`);

// Creating a simple HTTP server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Server running on port ${port}\nDatabase Host: ${dbHost}`);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
