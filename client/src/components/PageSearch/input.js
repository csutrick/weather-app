import React from "react";

import { MdSearch } from "react-icons/md";

const Input = ({ handleSearch, searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-1 flex h-14 w-full flex-row flex-nowrap">
      <input
        placeholder="Search Cities..."
        name="user input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-l-xl pl-3 text-2xl outline-none"
      />
      <button
        onClick={() => handleSearch(searchTerm)}
        className="flex min-h-14 min-w-14 items-center justify-center rounded-r-xl bg-blue-300 p-2"
      >
        <MdSearch className="h-[90%] w-[90%] text-white" />
      </button>
    </div>
  );
};

export default Input;
