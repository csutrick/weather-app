import React, { useEffect } from "react";

import { BsFillTrashFill } from "react-icons/bs";

const SearchHistory = ({
  handleSearch,
  searchHistory,
  setSearchHistory,
  setSearchTerm,
}) => {
  // Runs every time searchHistory changes
  useEffect(() => {
    console.log(`Search History changed updating with:`, searchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleDeleteSearch = (deletedCity) => {
    const updatedHistory = searchHistory.filter((city) => city !== deletedCity);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
  };

  const histoyItemClick = (city) => {
    setSearchTerm(city);

    handleSearch(city);
  };

  return (
    <div className="flex flex-col items-center justify-start bg-blue-300">
      <h3 className="mb-2 border-b-4 border-black bg-red-300 px-3 text-xl font-bold tracking-wider">
        Search History
      </h3>
      <div className="flex w-full flex-col space-y-2">
        {searchHistory.map((city, index) => (
          <div
            key={index}
            className="flex w-full flex-row flex-nowrap bg-red-300 p-1 text-lg font-bold"
          >
            <h3
              onClick={() => histoyItemClick(city)}
              className="w-full pl-2 text-2xl"
            >
              {city}
            </h3>
            <button onClick={() => handleDeleteSearch(city)} className="px-2">
              <BsFillTrashFill className="text-2xl text-black hover:text-gray-300" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
