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
    <div className="flex flex-col items-center justify-start">
      <h3 className="my-2 text-nowrap border-b-4 border-black px-4 text-2xl font-bold drop-shadow-md sm:text-lg md:text-2xl md:tracking-wide lg:text-3xl lg:tracking-wider xl:text-4xl">
        Search History
      </h3>
      <div className="grid w-full grid-flow-row grid-cols-2 gap-3 p-2 sm:flex sm:flex-col">
        {searchHistory.map((city, index) => (
          <div
            key={index}
            className="flex flex-row flex-nowrap justify-between text-nowrap rounded-lg border-4 border-blue-200 bg-gray-200 p-2 drop-shadow-md
            transition-all duration-100 ease-in hover:scale-105 hover:bg-blue-200 hover:drop-shadow-lg"
          >
            <h3
              onClick={() => histoyItemClick(city)}
              className="text-xl font-bold md:text-2xl lg:text-3xl lg:tracking-wider xl:text-4xl"
            >
              {city}
            </h3>
            <button onClick={() => handleDeleteSearch(city)} className="px-2">
              <BsFillTrashFill className="text-xl text-gray-400 transition-all duration-100 ease-in hover:text-red-400 md:text-2xl lg:text-3xl xl:text-4xl" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
