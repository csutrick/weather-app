import React, { useState, useEffect } from "react";

import Auth from "../utils/auth";

import Sidebar from "../components/PageSearch/sidebar";
import SearchResultsContainer from "../components/PageSearch/searchResultsContainer";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  const [profileId, setProfile] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const updateProfile = async () => {
      if (Auth.loggedIn()) {
        try {
          const token = Auth.getProfile();
          console.log(`${token.data.name} logged in`);
          setFavorites(token.data.favorites);
          setProfile(token.data._id);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        console.log("User not logged in");
      }
    };

    updateProfile();
  }, []);

  return (
    <section className="mt-16 flex h-screen flex-row flex-nowrap">
      {/* user searches terms from here */}
      <Sidebar setSearchResults={setSearchResults} />
      {/* user views results, adds favorites */}
      <SearchResultsContainer
        searchResults={searchResults}
        favorites={favorites}
        setFavorites={setFavorites}
        profileId={profileId}
      />
    </section>
  );
};

export default Home;
