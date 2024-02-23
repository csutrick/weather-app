import React, { useState, useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { QUERY_WEATHER_FORECAST } from "../../utils/queries";

import Auth from "../../utils/auth.js";

import Input from "./input";
import SearchHistory from "./searchHistory";

const Sidebar = ({ setSearchResults, searchTerm, setSearchTerm }) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [messageType, setMessageType] = useState("normal");

  const [searchHistory, setSearchHistory] = useState(() => {
    const savedSearches = localStorage.getItem("searchHistory");
    return savedSearches ? JSON.parse(savedSearches) : [];
  });

  const [getWeatherForecast, { loading, data, error }] = useLazyQuery(
    QUERY_WEATHER_FORECAST,
    {
      onCompleted: (data) => {
        console.log("Weather data received:", data.getWeatherForecast); // Log received data
        setSearchResults(data.getWeatherForecast);
        setStatusMessage("Search completed");
        setMessageType("normal");

        if (data.getWeatherForecast && data.getWeatherForecast.city) {
          setSearchHistory((prevHistory) => {
            const city = capitalizeFirstLetter(data.getWeatherForecast.city);
            const cityIndex = prevHistory.indexOf(city);

            if (cityIndex !== -1) {
              prevHistory.splice(cityIndex, 1);
            }
            return [city, ...prevHistory];
          });
        }
      },
      onError: (error) => {
        console.error("Error fetching weather data:", error); // Log error
        setStatusMessage("City Not Found");
        setMessageType("error");
      },
    },
  );

  const handleSearch = async () => {
    if (Auth.loggedIn()) {
      console.log("Searching weather for:", searchTerm);
      setStatusMessage("Loading...");
      setMessageType("normal");

      getWeatherForecast({ variables: { city: searchTerm } });
    } else {
      console.log("User not logged in");
      setStatusMessage("Not logged in");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      console.log("Search for", searchTerm);
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="w-full p-4 sm:w-1/3">
      {/* User input */}
      <Input setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <p
        className={`mb-2 drop-shadow-md w-full text-center text-2xl font-bold tracking-wider sm:text-xl sm:tracking-normal md:text-2xl md:tracking-wider ${messageType === "error" ? "text-red-500" : "text-black"}`}
      >
        {statusMessage}
      </p>
      {/* User search history */}
      <SearchHistory
        handleSearch={handleSearch}
        searchHistory={searchHistory}
        setSearchHistory={setSearchHistory}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default Sidebar;
