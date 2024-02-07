import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const SearchResultsContainer = ({ searchResults }) => {
  useEffect(() => {
    console.log("New search results, updating page");
  }, [searchResults]);

  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-blue-300">
      {searchResults && searchResults.city ? (
        <>
          <h2 className="border-b-4 border-black bg-red-300 px-8 text-5xl font-bold uppercase tracking-wider text-black">
            {searchResults.city}
          </h2>
          <h2 className="my-6 text-6xl font-bold text-black">
            {searchResults.forecast.list[0].main.temp}&deg;F
          </h2>
          <h2 className="text-base text-black">
            {searchResults.forecast.list[0].wind.speed} MPH Wind
          </h2>
          <h2 className="text-base text-black">
            {searchResults.forecast.list[0].main.humidity}% Humidity
          </h2>
          <span className="text-lg font-bold text-black">
            L:{searchResults.forecast.list[0].main.temp_min}&deg; | H:
            {searchResults.forecast.list[0].main.temp_max}&deg;
          </span>
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
