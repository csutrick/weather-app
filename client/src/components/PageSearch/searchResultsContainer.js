import React, { useEffect } from "react";

const SearchResultsContainer = ({ searchResults }) => {
  useEffect(() => {
    console.log("New search results, updating page");
  }, [searchResults]);

  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-blue-300">
      <h1 className="text-2xl font-bold text-white">Search Results</h1>
      {searchResults && searchResults.city ? (
        <p>{searchResults.city} weather found</p>
      ) : (
        <p>Search something</p>
      )}
    </div>
  );
};

export default SearchResultsContainer;
