document.addEventListener('DOMContentLoaded', function() {
    // Column Definitions
    const columnDefs = [
        { 
            field: 'ID', 
            sortable: true, 
            filter: true 
        },
        { 
            field: 'Name', 
            sortable: true, 
            filter: true 
        },
        { 
            field: 'Age', 
            sortable: true, 
            filter: true 
        },
        { 
            field: 'Grade', 
            sortable: true, 
            filter: true 
        }
    ];

    // Grid Options
    const gridOptions = {
        columnDefs: columnDefs,
        defaultColDef: {
            flex: 1,
            resizable: true
        },
        pagination: true,
        paginationPageSize: 10,
        // Custom row styling for A grades
        getRowClass: function(params) {
            if (params.data && params.data.Grade === 'A') {
                return 'grade-a';
            }
            return '';
        }
    };

    // Initialize the grid
    const gridDiv = document.querySelector('#myGrid');
    const grid = new agGrid.Grid(gridDiv, gridOptions);

    // Load CSV using PapaParse
    Papa.parse('students.csv', {
        download: true,
        header: true,
        complete: function(results) {
            // Process data (convert Age to number)
            const processedData = results.data.map(row => ({
                ...row,
                Age: parseInt(row.Age, 10) || 0
            }));

            // Set row data
            gridOptions.api.setRowData(processedData);
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
        }
    });
});


const changeFontBtn = document.getElementById('change-font-btn');
const fonts = [
  'Roboto', 
  'Lato', 
  'Open Sans', 
  'Montserrat', 
  'Poppins', 
  'Raleway', 
  'Nunito', 
  'Merriweather', 
  'Oswald', 
  'Playfair Display'
];

changeFontBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * fonts.length);
  const fontFamily = fonts[randomIndex];
  
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  document.getElementById('myGrid').style.fontFamily = `'${fontFamily}', sans-serif`;
});


const browserInfoDiv = document.getElementById('browser-info');

const updateBrowserInfo = () => {
    const browserInfo = `
    <strong>Browser Name:</strong> ${navigator.appName}<br>
    <strong>Browser Version:</strong> ${navigator.appVersion}<br>
    <strong>Window Dimensions:</strong> ${window.innerWidth} x ${window.innerHeight}<br>
    <strong>User Agent:</strong> ${navigator.userAgent}
    `;
    browserInfoDiv.innerHTML = browserInfo;
};

updateBrowserInfo();

// Update window dimensions on resize
window.addEventListener('resize', updateBrowserInfo);