import React, { useEffect, useState } from 'react';

// Custom icon components
const ExternalLinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LoaderIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const DiseaseDetails = ({ disease, setHierarchy }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.ebi.ac.uk/ols4/api/ontologies/${disease.ontology_name}/terms?id=${encodeURIComponent(disease.iri)}`
        );
        const data = await response.json();
        console.log(data)
        setDetails(data);
        console.log(data?._embedded.terms[0]?._links)
        setHierarchy(data?._embedded.terms[0]?._links);
      } catch (error) {
        console.error("Error fetching disease details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (disease) fetchDetails();
  }, [disease, setHierarchy]);

  if (!disease) return null;

  return (
    <div className="disease-container">
      {loading ? (
        <div className="loading-container">
          <LoaderIcon />
        </div>
      ) : details ? (
        <div className="details-content">
          <h2 className="disease-title">
            <span className="gradient-text">
              {details?._embedded?.terms[0]?.label}
            </span>
            <a
              href={details?._embedded?.terms[0]?.iri}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              <ExternalLinkIcon />
            </a>
          </h2>

          <div className="ontology-footer">
            <p className="ontology-id">
              ID - <span className='ontology-id-span'>{details?._embedded?.terms[0]?.obo_id} </span>
            </p>
          </div>

          <div className="details-section">
            <h3 className="section-title">
              Description
            </h3>
            <p className="description-text">
              {details?._embedded?.terms[0]?.description[0] || "No description available."}
            </p>
          </div>

          <div className="details-section">
            <h3 className="section-title">
              Also Known as:
            </h3>
            {details?._embedded?.terms[0]?.synonyms.length > 0 ? (
              <ul className="synonyms-grid">
                {details?._embedded?.terms[0]?.synonyms.map((synonym, index) => (
                  <li key={index} className="synonym-item">
                    {synonym}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">No other names available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="no-details">
          <p>No details available.</p>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetails;
