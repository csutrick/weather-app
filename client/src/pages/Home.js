import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import FavoriteContainer from "../components/PageSearch/favoriteContainer";
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
    <section className="relative mt-16 flex h-screen flex-col flex-nowrap">
      <FavoriteContainer favorites={favorites} />
      <div className="flex h-screen flex-row">
        <Sidebar setSearchResults={setSearchResults} />
        <SearchResultsContainer
          searchResults={searchResults}
          favorites={favorites}
          setFavorites={setFavorites}
          profileId={data?.me?._id}
        />
      </div>
    </section>
  );
};

export default Home;
