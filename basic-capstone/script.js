const dataUrl = 'data.json';
let filteredPapers = [];  
let displayedPapers = []; 
let currentPage = 1;    
let cardsPerPage = 50;  
let searchTerm = '';    

/* DOM Elements */
const cardsContainer = document.getElementById('cards');
const loadingIndicator = document.getElementById('loading');
const searchInput = document.getElementById('search');
const sortDropdown = document.getElementById('sort');
const yearStartInput = document.getElementById('yearStart');
const yearEndInput = document.getElementById('yearEnd');
const cardsPerPageInput = document.getElementById('cardsPerPage');
const paginationContainer = document.getElementById('pagination');

const sidebarPaginationContainer = document.getElementById('sidebar-pagination'); 


/* Fetch Data */
fetch('data.json') 
  .then(response => response.json())
  .then(data => {
    filteredPapers = data;
    displayedPapers = data; 
    renderCards();
    renderSidebarPagination();
    loadingIndicator.style.display = 'none'; 
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    loadingIndicator.textContent = 'Failed to load data.';
  });

// Search functionality with debounce
searchInput.addEventListener('input', debounce(applyFilters, 300));

/* Show/Hide Loading */
function showLoading() {
  loadingIndicator.style.display = 'block';
}

function hideLoading() {
  loadingIndicator.style.display = 'none';
}

/* Render Cards */
function renderCards() {
  if (displayedPapers.length === 0) {
    cardsContainer.innerHTML = '<p>No papers found for the given search.</p>';
    return;
  }

  cardsContainer.innerHTML = '';
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;


  displayedPapers.slice(start, end).forEach((paper) => {
    const card = document.createElement('div');
    card.className = 'card';
    const truncatedAbstract = paper.abstract ? paper.abstract.slice(0, 150) + '...' : 'N/A';
    card.innerHTML = `
      <h2>${paper.title}</h2>
      <hr>
      <div class="paper-details">
          <div><strong>Authors:</strong> ${paper.authors.slice(1, paper.authors.length - 1)}</div>
          <div><strong>Year:</strong> ${paper.year}</div>
          <div><strong>Venue:</strong> ${paper.venue || 'N/A'}</div>
          <div><strong>Citations:</strong> ${paper.n_citation || '0'}</div>
      </div>
      <p><strong>Abstract:</strong> <span class="abstract-text">${truncatedAbstract}</span></p>
      <button href="#" class="read-more">Read more</button>
    `;

    const readMoreButton = card.querySelector('.read-more');
    const abstractText = card.querySelector('.abstract-text');

    // Toggle abstract visibility on "Read more" click
    readMoreButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (abstractText.textContent.endsWith('...')) {
        abstractText.textContent = paper.abstract; // Show full abstract
        readMoreButton.textContent = 'Read less'; // Change text to 'Read less'
      } else {
        abstractText.textContent = truncatedAbstract; // Truncate abstract again
        readMoreButton.textContent = 'Read more'; // Change text to 'Read more'
      }
    });

    cardsContainer.appendChild(card);
  });

  renderPagination();  // Re-render pagination after updating the cards
}

/* Render Pagination */
function renderPagination() {
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(displayedPapers.length / cardsPerPage);

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Previous';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderCards();
      renderSidebarPagination();
    }
  });
  paginationContainer.appendChild(prevBtn);

  const pageNumber = document.createElement('span');
  pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
  paginationContainer.appendChild(pageNumber);

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderCards();
      renderSidebarPagination();
    }
  });
  paginationContainer.appendChild(nextBtn);
}

function renderSidebarPagination() {
  sidebarPaginationContainer.innerHTML = ''; // Clear existing buttons

  const totalPages = Math.ceil(filteredPapers.length / cardsPerPage); // Calculate total pages

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = i === currentPage ? 'active' : ''; // Highlight active page
    pageButton.addEventListener('click', () => {
      currentPage = i; // Set the current page
      renderCards(); // Render cards for the selected page
      renderSidebarPagination(); // Re-render the pagination to update active state
    });
    sidebarPaginationContainer.appendChild(pageButton);
  }
}

/* Filters */
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const startYear = parseInt(yearStartInput.value) || Number.MIN_VALUE;
  const endYear = parseInt(yearEndInput.value) || Number.MAX_VALUE;

  // Filter by search term, year range, and sorting
  displayedPapers = filteredPapers.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm)
    const inYearRange = paper.year >= startYear && paper.year <= endYear;

    return matchesSearch && inYearRange;
  });

  if (sortDropdown.value === 'asc') {
    displayedPapers.sort((a, b) => a.year - b.year);
  } else if (sortDropdown.value === 'desc') {
    displayedPapers.sort((a, b) => b.year - a.year);
  }

  currentPage = 1;  // Reset to the first page after applying filters
  renderCards();
  renderPagination();
  renderSidebarPagination();
}

function clearFilters() {
  searchInput.value = ''; 
  yearStartInput.value = '';
  yearEndInput.value = ''; 
  sortDropdown.value = ''; 
  cardsPerPageInput.value = 50; 
  cardsPerPage = 50; 

  // Reset displayed papers to the full dataset
  displayedPapers = filteredPapers;
  currentPage = 1; 
  renderCards(); 
  renderPagination();
  renderSidebarPagination();
}

function exportFilteredData(filteredData) {
  const zip = new JSZip();
  
  // Convert filtered data to CSV format
  const csvContent = filteredData.map(paper => 
    `${paper.id},${paper.title},${paper.authors},${paper.year},${paper.venue},${paper.n_citation},${paper.abstract}`
  ).join('\n');
  
  // Add the CSV content to the zip file
  zip.file('filtered_papers.csv', csvContent);

  // Generate the zip file and trigger download
  zip.generateAsync({ type: 'blob' }).then(content => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'filtered_papers.zip';
    a.click();
  });
}

/* Event Listeners */
sortDropdown.addEventListener('change', applyFilters);
yearStartInput.addEventListener('input', applyFilters);
yearEndInput.addEventListener('input', applyFilters);
cardsPerPageInput.addEventListener('input', () => {
  cardsPerPage = parseInt(cardsPerPageInput.value) || 10;
  applyFilters();
});

document.getElementById('clear-filters').addEventListener('click', clearFilters);
document.getElementById('export-data').addEventListener('click', () => {
  exportFilteredData(displayedPapers); // Export only displayed (filtered) data
});

document.addEventListener('DOMContentLoaded', () => {
  renderSidebarPagination(); // Render sidebar pagination when the DOM is ready
});

/* Debounce function */
function debounce(func, delay) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}
