import React from "react";

import Sidebar from "../components/PageSearch/sidebar";
import SearchResults from "../components/PageSearch/searchResults";

const Home = () => {
  return (
    <section className="mt-16 flex h-screen flex-row flex-nowrap">
      {/* user searches terms from here */}
      <Sidebar />
      {/* user views results, adds favorites */}
      <SearchResults />
    </section>
  );
};

export default Home;
