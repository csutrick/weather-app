import React from "react";

const SearchHistory = () => {
  return (
    <div className="flex flex-col items-center justify-start bg-blue-300">
      <h3 className="mb-2 border-b-4 border-black bg-red-300 px-3 text-xl font-bold tracking-wider">
        Search History
      </h3>
      <div className="flex h-10 w-full items-center justify-center rounded-xl bg-red-300">
        No past searches
      </div>
    </div>
  );
};

export default SearchHistory;
