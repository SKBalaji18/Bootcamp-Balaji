/*export const fetchData = (url: string): Promise<string> => {
    return fetch(url)
      .then(response => response.text())
      .catch(err => {
        console.error('Error fetching CSV:', err);
        throw err;
      });
  }; */

  export const fetchData = (url: string): Promise<string> => {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log("CSV fetched successfully", data); // Log the raw CSV data
        return data;
      })
      .catch(err => {
        console.error('Error fetching CSV:', err);
        throw err;
      });
  };
  