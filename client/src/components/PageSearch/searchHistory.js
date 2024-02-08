import React, { useEffect } from "react";

const SearchHistory = ({ searchHistory }) => {
  // Runs every time searchHistory changes
  useEffect(() => {
    console.log(`Search History changed updating with:`, searchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <div className="flex flex-col items-center justify-start bg-blue-300">
      <h3 className="mb-2 border-b-4 border-black bg-red-300 px-3 text-xl font-bold tracking-wider">
        Search History
      </h3>
      <div className="flex w-full flex-col space-y-2">
        {searchHistory.map((city, index) => (
          <div
            key={index}
            className="w-full bg-red-300 text-center text-lg font-bold"
          >
            {city}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
