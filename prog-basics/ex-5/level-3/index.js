require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();


function secureLog(key, value) {
  if (key.toLowerCase().includes('key') || key.toLowerCase().includes('pass')) {
    console.log(`${key}: ${value.slice(0, 4)}***`);
  } else {
    console.log(`${key}: ${value}`);
  }
}

// Access and log environment variables securely
const dbFile = process.env.DB_FILE || 'default.sqlite';
const apiKey = process.env.API_KEY || 'default-key';

secureLog('DB_FILE', dbFile);
secureLog('API_KEY', apiKey);

// Initialize SQLite database connection
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log(`Connected to SQLite database at ${dbFile}`);
  }
});

//Create a table and insert a record
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)`,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Users table created successfully');
      }
    }
  );

  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  stmt.run('Balaji', 'abc@example.com', (err) => {
    if (err) {
      console.error('Error inserting user:', err.message);
    } else {
      console.log('User inserted successfully');
    }
  });
  stmt.finalize();

  // Fetch and display users
  db.each('SELECT id, name, email FROM users', (err, row) => {
    if (err) {
      console.error('Error querying users:', err.message);
    } else {
      console.log(`User: ${row.id} - ${row.name} - ${row.email}`);
    }
  });
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
