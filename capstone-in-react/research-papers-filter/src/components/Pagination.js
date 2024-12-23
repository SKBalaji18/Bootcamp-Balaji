const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    return (
      <footer id="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </footer>
    );
  };
  
  export default Pagination;
  