const Sidebar = ({ applyFilters, setSearchTerm, setYearStart, setYearEnd, setSortOrder, setCardsPerPage, cardsPerPage, handleExport,clearFilters }) => {
    return (
      <aside id="filters">
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by title" />
  
        <label htmlFor="sort">Sort by Year:</label>
        <select id="sort" onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
  
        <label htmlFor="yearStart">Start Year:</label>
        <input type="number" id="yearStart" onChange={(e) => setYearStart(e.target.value)} placeholder="Start year" />
  
        <label htmlFor="yearEnd">End Year:</label>
        <input type="number" id="yearEnd" onChange={(e) => setYearEnd(e.target.value)} placeholder="End year" />
  
        <label htmlFor="cardsPerPage">Cards per Page:</label>
        <input type="number" id="cardsPerPage" value={cardsPerPage} min="1" onChange={(e) => setCardsPerPage(e.target.value)} />
  
        <button id="clear-filters" onClick={applyFilters}>Apply Filters</button>
        <button id="clear-filters" onClick={clearFilters}>Clear Filters</button>
        <button id="export-data" onClick={handleExport}>Export Filtered Data</button>
      </aside>
    );
  };
  
  export default Sidebar;
  