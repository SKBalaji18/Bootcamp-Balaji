/*import { createGrid, GridOptions } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community/client-side-row-model';
import { ModuleRegistry } from 'ag-grid-community';
import Papa from 'papaparse';
import { Student } from './types';

// Register the client-side row model
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Fetch and parse CSV data
async function fetchAndParseCSV(): Promise<Student[]> {
  const response = await fetch('./src/students.csv');
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<Student>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
}

// Set up AG Grid with parsed CSV data
export async function setupAGGridWithCSV(): Promise<void> {
  const studentData = await fetchAndParseCSV();

  // Define AG Grid column definitions
  const columnDefs = [
    { headerName: 'ID', field: 'ID', sortable: true, filter: true },
    { headerName: 'Name', field: 'Name', sortable: true, filter: true },
    { headerName: 'Age', field: 'Age', sortable: true, filter: true },
    {
      headerName: 'Grade',
      field: 'Grade',
      sortable: true,
      filter: true,
      cellStyle: (params: { value: string }) =>
        params.value === 'A' ? { backgroundColor: '#d4edda', color: '#155724' } : null,
    },
  ];

  // Define AG Grid options
  const gridOptions: GridOptions = {
    columnDefs: columnDefs,
    rowData: studentData,
    animateRows: true,
  };

  // Render the grid
  const gridDiv = document.getElementById('myGrid') as HTMLElement;
  createGrid(gridDiv, gridOptions);
} */

  import { GridOptions, Grid } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';  // Import AG Grid styles
  import 'ag-grid-community/styles/ag-theme-alpine.css';  // Import AG Grid theme styles
  import Papa from 'papaparse';
  import { Student } from './types';
  


// Function to set up AG Grid
export async function setupAGGrid(data: any[]): Promise<void> {
    try {

      console.log("Setting up AG Grid with data:", data); // Log the data passed to AG Grid
      if (!data || data.length === 0) {
        console.error("No data to display in AG Grid.");
        return;
      }
  
      // Define column definitions for AG Grid
      const columnDefs = [
        { headerName: 'ID', field: 'ID', sortable: true, filter: true },
        { headerName: 'Name', field: 'Name', sortable: true, filter: true },
        { headerName: 'Age', field: 'Age', sortable: true, filter: true },
        {
          headerName: 'Grade',
          field: 'Grade',
          sortable: true,
          filter: true,
          cellStyle: (params: { value: string }) =>
            params.value === 'A' ? { backgroundColor: '#d4edda', color: '#155724' } : null,
        },
      ];
  
      // Define the grid options
      const gridOptions: GridOptions = {
        columnDefs,
        rowData: data,
        animateRows: true,
      };
  
      // Get the div element where the grid will be rendered
      const gridDiv = document.querySelector('#myGrid') as HTMLElement;
  
      // Initialize the grid with the grid options
      new Grid(gridDiv, gridOptions);
    } catch (error) {
      console.error('Error initializing the grid:', error);
    }
  }