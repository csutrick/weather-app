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
    <div className="mb-1 flex h-14 w-full flex-row flex-nowrap">
      <input
        placeholder="Search Cities..."
        name="user input"
        type="text"
        value={currentSearchTerm}
        onChange={(e) => setCurrentSearchTerm(e.target.value)}
        className="w-full rounded-l-xl pl-3 text-2xl sm:text-base md:text-xl lg:text-3xl xl:text-4xl outline-none"
      />
      <button
        onClick={() => searchUserInput()}
        className="flex min-h-14 min-w-14 items-center justify-center rounded-r-xl bg-blue-300 p-2"
      >
        <MdSearch className="h-[90%] w-[90%] text-white" />
      </button>
    </div>
  );
};

export default Input;
