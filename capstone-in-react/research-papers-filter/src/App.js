import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import Pagination from './components/Pagination';
/*import ExportButton from './components/ExportButton'; */
import Papa from 'papaparse';
import JSZip from 'jszip';
import './styles.css';

const App = () => {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('/data.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Read the response as text
      })
      .then((csvText) => {
        // Parse the CSV text into JSON
        const result = Papa.parse(csvText, { header: true });
        setPapers(result.data);
        setFilteredPapers(result.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const applyFilters = () => {
    let filtered = papers.filter(paper => {
      const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase());
      const inYearRange = paper.year >= (yearStart || Number.MIN_VALUE) && paper.year <= (yearEnd || Number.MAX_VALUE);
      return matchesSearch && inYearRange;
    });

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.year - b.year);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.year - a.year);
    }

    setFilteredPapers(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setYearStart('');
    setYearEnd('');
    setSortOrder('asc');
    setFilteredPapers(papers);  // Reset to all papers
    setCurrentPage(1);  // Reset to the first page
  };

  const handleExport = () => {
    const zip = new JSZip();
    const csvContent = filteredPapers.map(paper => 
      `${paper.id},${paper.title},${paper.authors},${paper.year},${paper.venue},${paper.n_citation},${paper.abstract}`
    ).join('\n');
    zip.file('filtered_papers.csv', csvContent);
    zip.generateAsync({ type: 'blob' }).then(content => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = 'filtered_papers.zip';
      a.click();
    });
  };

  return (
    <div id="app">
      <Navbar />
      <div id="main-content">
        <Sidebar
          applyFilters={applyFilters}
          setSearchTerm={setSearchTerm}
          setYearStart={setYearStart}
          setYearEnd={setYearEnd}
          setSortOrder={setSortOrder}
          setCardsPerPage={setCardsPerPage}
          cardsPerPage={cardsPerPage}
          handleExport={handleExport}
          clearFilters={clearFilters}
        />
        <main className="card-container">
          <div id="loading">{filteredPapers.length === 0 ? 'No Data Found' : ''}</div>
          <div id="cards">
            {filteredPapers.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map(paper => (
              <Card key={paper.id} paper={paper} />
            ))}
          </div>
        </main>
      </div>
      <Pagination 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalPages={Math.ceil(filteredPapers.length / cardsPerPage)} 
      />
    </div>
  );
};

export default App;
