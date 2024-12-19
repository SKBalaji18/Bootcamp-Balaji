export const parseCSV = (csvData: string) => {
    // Logic for parsing CSV data (you can use PapaParse or custom parsing logic)
    return csvData.split('\n').map(line => line.split(','));
  };