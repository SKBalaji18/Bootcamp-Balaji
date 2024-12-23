import React, { useState } from 'react';

const PaperCard = ({ paper }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

    console.log(paper)
    const truncatedAbstract = paper.abstract ? paper.abstract.slice(0, 150) + '...' : 'N/A';
  
    return (
      <div className="card">
        <h2>{paper.title}</h2>
        <hr />
        <div className="paper-details">
          <div><strong>Authors:</strong> {paper.authors}</div>
          <div><strong>Year:</strong> {paper.year}</div>
          <div><strong>Venue:</strong> {paper.venue || 'N/A'}</div>
          <div><strong>Citations:</strong> {paper.n_citation || '0'}</div>
        </div>
        <p><strong>Abstract:</strong> <span>{truncatedAbstract}</span></p>
        <p>
        {isExpanded ? paper.abstract : truncateText(paper.abstract, 100)}
      </p>
        <button className="read-more" onClick={toggleText}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
      </div>
    );
  };
  
  export default PaperCard;
  