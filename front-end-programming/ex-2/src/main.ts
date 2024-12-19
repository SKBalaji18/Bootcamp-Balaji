import Papa from 'papaparse';

function loadCSV(){
    return fetch('./data/data.csv') // Adjust the path as needed
    .then(response => response.text())
    .then(csv => {
      Papa.parse(csv, {
        header: true,
        complete: (result) => {
          console.log(result.data); // Parsed CSV data
          renderTable(result.data as any[]);
        }
      });
    });
}

async function loadJSON() {
    const response = await fetch('./data/data.json');
    const data = await response.json();
    renderTable(data);
}


function renderTable(data: any[]) {
    const app = document.getElementById('app');
    if (!app) return;

    // Create table
    const table = document.createElement('table');
    const headers = Object.keys(data[0]);
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Render headers
    const headerRow = document.createElement('tr');
    headers.forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        th.addEventListener('click', () => sortTable(data, header));
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Render rows
    data.forEach((row) => {
        const tr = document.createElement('tr');
        headers.forEach((header) => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    app.appendChild(table);
}

function sortTable(data: any[], key: string) {
    const sortedData = [...data].sort((a, b) =>
        a[key] > b[key] ? 1 : -1
    );
    renderTable(sortedData);
}

function addFilterAndHighlighting() {
    const app = document.getElementById('app');
    const filterInput = document.createElement('input');
    filterInput.placeholder = 'Filter rows...';

    filterInput.addEventListener('input', (event) => {
        const value = (event.target as HTMLInputElement).value.toLowerCase();
        const rows = document.querySelectorAll('tr');
        rows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll('td'));
            if (cells.some((cell) => cell.textContent?.toLowerCase().includes(value))) {
                row.style.display = '';
                row.classList.add('highlight');
            } else {
                row.style.display = 'none';
            }
        });
    });

    app?.prepend(filterInput);
}



loadJSON()

loadCSV()
addFilterAndHighlighting()
