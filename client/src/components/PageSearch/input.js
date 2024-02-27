import React, { useState, useEffect } from "react";

import { MdSearch } from "react-icons/md";

const Input = ({ setSearchTerm, searchTerm }) => {
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  const searchUserInput = () => {
    console.log("User searching", currentSearchTerm);

    setSearchTerm(currentSearchTerm);
  };

  useEffect(() => {
    setCurrentSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <div className="mb-1 flex h-14 w-full flex-row flex-nowrap drop-shadow-md">
      <input
        placeholder="Search Cities..."
        name="user input"
        type="text"
        value={currentSearchTerm}
        onChange={(e) => setCurrentSearchTerm(e.target.value)}
        className="w-full bg-gray-200 text-gray-600 rounded-l-xl pl-3 text-2xl outline-none sm:text-base md:text-xl lg:text-3xl xl:text-4xl"
      />
      <button
        onClick={() => searchUserInput()}
        className="group flex min-h-14 min-w-14 items-center justify-center rounded-r-xl bg-blue-400 p-2 transition-all duration-100 ease-in hover:bg-blue-300"
      >
        <MdSearch className="h-[90%] w-[90%] text-white transition-all duration-100 ease-in group-hover:scale-105" />
      </button>
    </div>
  );
};

export default Input;
