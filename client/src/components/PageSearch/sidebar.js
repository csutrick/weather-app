import React, { useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { QUERY_WEATHER_FORECAST } from "../../utils/queries";

import Input from "./input";
import SearchHistory from "./searchHistory";

const Sidebar = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
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
            const city = data.getWeatherForecast.city;
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
        setStatusMessage("City not found");
        setMessageType("error");
      },
    },
  );

  const handleSearch = async (searchTerm) => {
    console.log("Searching weather for:", searchTerm);
    setStatusMessage("Loading...");
    setMessageType("normal");

    getWeatherForecast({ variables: { city: searchTerm } });
  };

  return (
    <div className="w-1/4 bg-green-300 p-4">
      {/* User input */}
      <Input
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <p
        className={`mb-4 w-full text-center text-2xl font-bold ${messageType === "error" ? "text-red-500" : "text-black"}`}
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
