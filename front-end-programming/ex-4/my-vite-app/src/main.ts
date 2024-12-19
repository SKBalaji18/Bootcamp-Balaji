import Papa from 'papaparse';
import './styles/styles.scss';


const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);

// Example of lazy loading a module (e.g., CSV parser)

interface Student {
  name: string;
  age: string;
}

const fetchAndParseCSV = async () => {
  try {
    // Fetch the CSV file from the public directory
    const response = await fetch('/data.csv');
    const csvData = await response.text(); // Read the CSV file as text

    // Parse the CSV data using PapaParse
    Papa.parse(csvData, {
      header: true, // Treat the first row as headers
      complete: (result: Papa.ParseResult<Student>) => {
        console.log('Parsed CSV:', result.data); // Array of parsed rows
        renderTable(result.data); // Render the parsed data in the table
      },
    });
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
  }
};

// Function to render the CSV data as a table
const renderTable = (students: Student[]) => {
  const table = document.createElement('table');
  const thead = table.createTHead();
  const tbody = table.createTBody();

  // Create header row
  const headerRow = thead.insertRow();
  const headers = ['Name', 'Age'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  // Create data rows
  students.forEach(student => {
    const row = tbody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    cell1.textContent = student.name;
    cell2.textContent = student.age;
  });

  // Append the table to the body or a specific container
  document.body.appendChild(table);
};

// Call the function to fetch and parse the CSV data
fetchAndParseCSV();