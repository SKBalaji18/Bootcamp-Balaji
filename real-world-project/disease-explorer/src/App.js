import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import TreeView from "./components/TreeView";
import DiseaseDetails from "./components/DiseaseDetails";

const App = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [hierarchy, setHierarchy] = useState([]);
  const [isInitialState, setIsInitialState] = useState(true);

  const handleDiseaseSelect = (disease) => {
    setSelectedDisease(disease);
    setIsInitialState(false);
  };

  const LoaderIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );

  const LoadingSpinner = () => (
    <div className="loading-wrapper">
      <LoaderIcon
        strokeColor="#6366f1"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      <p className="loading-text">Loading disease information...</p>
    </div>
  );

  const WelcomeProcess = () => (
    <div className="welcome-container">
      <h1 className="welcome-title">Disease Search Process</h1>
      <div className="process-steps">
        <div className="step">
          <div className="step-content">
            <h3>Search Disease</h3>
            <p>Enter the disease name in the search bar above</p>
          </div>
        </div>
        <div className="step">
          <div className="step-content">
            <h3>Select from Suggestions</h3>
            <p>Choose the relevant disease from the dropdown suggestions</p>
          </div>
        </div>
        <div className="step">
          <div className="step-content">
            <h3>View Details</h3>
            <p>Explore disease details and hierarchical relationships</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
  <>
      <nav>
        <h1>Disease Explorer</h1>
      </nav>
      <div className="container">
      <SearchBar setSelectedDisease={handleDiseaseSelect} />
      {isInitialState ? (
        <WelcomeProcess />
      ) : (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ width: "300px" }}>
            {selectedDisease && (
              <DiseaseDetails 
                disease={selectedDisease} 
                setHierarchy={setHierarchy} 
                LoadingSpinner={LoadingSpinner}
              />
            )}
          </div>
          <TreeView 
            disease={selectedDisease} 
            hierarchy={hierarchy} 
            LoadingSpinner={LoadingSpinner}
          />
        </div>
      )}
    </div>
  </>   
  );
};

export default App;