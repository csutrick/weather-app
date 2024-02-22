import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

import SearchResults from "./searchResults";

import FavoriteIcon from "./favoriteIcon";

const SearchResultsContainer = ({
  searchResults,
  favorites,
  setFavorites,
  profileId,
}) => {
  useEffect(() => {
    console.log("New search results, updating page", searchResults);
  }, [searchResults]);

  return (
    <div className="relative flex flex-grow flex-col items-center bg-blue-300">
      {searchResults && searchResults.city ? (
        <>
          <SearchResults searchResults={searchResults} />
          <FavoriteIcon
            searchResults={searchResults}
            favorites={favorites}
            setFavorites={setFavorites}
            profileId={profileId}
          />
        </>
      ) : (
        <>
          {Auth.loggedIn() ? (
            <h2 className="text-2xl font-bold text-black">
              No data to display
            </h2>
          ) : (
            <>
              <p>User not Signed in</p>
              <div className="flex flex-row flex-nowrap items-center justify-center">
                <Link
                  className="px-3 py-1 text-2xl font-bold text-black"
                  to="/login"
                >
                  Login
                </Link>
                <p className="text-base font-bold text-black">or</p>
                <Link
                  className="px-3 py-1 text-2xl font-bold text-black"
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsContainer;
