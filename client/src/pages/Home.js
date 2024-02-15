import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import Sidebar from "../components/PageSearch/sidebar";
import SearchResultsContainer from "../components/PageSearch/searchResultsContainer";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { data, loading, error } = useQuery(QUERY_ME, {
    skip: !Auth.loggedIn(),
  });

  useEffect(() => {
    if (!loading && data && data.me) {
      setFavorites(data.me.favorites);
    }
    if (error) {
      console.error("Error fetching user data:", error);
    }
  }, [data, loading, error]);

  return (
    <section className="mt-16 flex h-screen flex-row flex-nowrap">
      <Sidebar setSearchResults={setSearchResults} />
      <SearchResultsContainer
        searchResults={searchResults}
        favorites={favorites}
        setFavorites={setFavorites}
        profileId={data?.me?._id}
      />
    </section>
  );
};

export default Home;
