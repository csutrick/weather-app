import React from "react";

import Input from "./input";
import SearchHistory from "./searchHistory";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-green-300 p-4">
      {/* User input */}
      <Input />
      {/* User search history */}
      <SearchHistory />
    </div>
  );
};

export default Sidebar;
