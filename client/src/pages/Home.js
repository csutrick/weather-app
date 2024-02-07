import React, { useState } from "react";

import Sidebar from "../components/PageSearch/sidebar";
import SearchResultsContainer from "../components/PageSearch/searchResultsContainer";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <section className="mt-16 flex h-screen flex-row flex-nowrap">
      {/* user searches terms from here */}
      <Sidebar setSearchResults={setSearchResults} />
      {/* user views results, adds favorites */}
      <SearchResultsContainer searchResults={searchResults} />
    </section>
  );
};

export default Home;
