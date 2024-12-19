/*import Papa from 'papaparse';

export const parseCSV = (csvString: string): any[] => {
  const result = Papa.parse(csvString, { header: true });
  return result.data;
}; */

/*import Papa from 'papaparse';
import { Student } from './types';

export const parseCSV = (csvText: string): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<Student>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
    });
  });
}; */

import Papa from 'papaparse';
import { Student } from './types';

export const parseCSV = (csvText: string): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<Student>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed CSV data:", results.data); // Log parsed data
        resolve(results.data);
      },
      error: (e: Error) => {  // Explicitly type 'e' as an Error object
        console.error("Error parsing CSV:", e); // Log the error
        reject(e);  // Reject the promise with the error
      },
    });
  });
};

