import { fetchData } from './dataLoader';
import { parseCSV } from './csvParser';
import { setupAGGrid } from './ag-grid-setup';
import './style.css';


const fetchAllData =()=>{
  return fetchData('./students.csv')
    .then(parseCSV)
    .then(setupAGGrid)
    .catch(console.error);
}

const loadCsvBtn = document.getElementById('loadCsvBtn') as HTMLButtonElement;
loadCsvBtn.addEventListener('click',fetchAllData );