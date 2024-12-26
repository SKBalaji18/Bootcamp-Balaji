/* import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SearchBar = ({ setSelectedDisease }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setError("");

    if (value.trim()) {
      setIsLoading(true);
      const url = new URL("https://www.ebi.ac.uk/ols4/api/search");
      url.searchParams.append("q", value);
      url.searchParams.append("ontology", "efo,mondo");
      url.searchParams.append("format", "json");

      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response.docs.length === 0) {
          setError("No diseases found matching your search");
          setSuggestions([]);
        } else {
          setSuggestions(data.response.docs);
        }
      } catch (error) {
        setError("An error occurred while searching. Please try again.");
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
      setError("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClickSuggestion = (disease) => {
    setSelectedDisease(disease);
    setQuery(disease.label);
    setSuggestions([]);
    setError("");
    setIsFocused(false);
  };

  return (
    <div className="search-bar" style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Search for a disease..."
        value={query}
        onChange={handleSearch}
        onFocus={handleFocus}
        className={error ? "error" : ""}
      />
      {isFocused && (error || suggestions.length > 0) && (
        <ul className="suggestions">
          {error ? (
            <li className="error-message">{error}</li>
          ) : (
            suggestions.map((item) => (
              <li
                key={uuidv4()}
                className="suggestion-item"
                onClick={() => handleClickSuggestion(item)}
              >
                {item.label} - {item.obo_id}
              </li>
            ))
          )}
        </ul>
      )}
      {isLoading && <div className="search-loader"></div>}
    </div>
  );
};

export default SearchBar;
*/

import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const SearchBar = ({ setSelectedDisease }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const fetchSuggestions = async (value) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the previous request
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const url = new URL("https://www.ebi.ac.uk/ols4/api/search");
    url.searchParams.append("q", value);
    url.searchParams.append("ontology", "efo,mondo");
    url.searchParams.append("format", "json");

    try {
      setIsLoading(true);
      const response = await fetch(url, { signal: controller.signal });
      const data = await response.json();

      if (data.response.docs.length === 0) {
        setError("No diseases found matching your search");
        setSuggestions([]);
      } else {
        setSuggestions(data.response.docs);
        setError("");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setError("An error occurred while searching. Please try again.");
        setSuggestions([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setError("");
    setSuggestions([]);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (value.trim()) {
      debounceTimeoutRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 100); // Debounce delay in milliseconds
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClickSuggestion = (disease) => {
    setSelectedDisease(disease);
    setQuery(disease.label);
    setSuggestions([]);
    setError("");
    setIsFocused(false);
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="search-bar" style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Search for a disease..."
        value={query}
        onChange={handleSearch}
        onFocus={handleFocus}
        className={error ? "error" : ""}
      />
      {isFocused && (error || suggestions.length > 0) && (
        <ul className="suggestions">
          {error ? (
            <li className="error-message">{error}</li>
          ) : (
            suggestions.map((item) => (
              <li
                key={uuidv4()}
                className="suggestion-item"
                onClick={() => handleClickSuggestion(item)}
              >
                {item.label} - {item.obo_id}
              </li>
            ))
          )}
        </ul>
      )}
      {isLoading && <div className="search-loader"></div>}
    </div>
  );
};

export default SearchBar;
