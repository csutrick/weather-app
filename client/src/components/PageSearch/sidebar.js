import React from "react";

import { useLazyQuery } from "@apollo/client";
import { QUERY_WEATHER_FORECAST } from "../../utils/queries";

import Input from "./input";
import SearchHistory from "./searchHistory";

const Sidebar = ({ setSearchResults }) => {
  const [getWeatherForecast, { loading, data, error }] = useLazyQuery(
    QUERY_WEATHER_FORECAST,
    {
      onCompleted: (data) => {
        console.log("Weather data received:", data.getWeatherForecast); // Log received data
        setSearchResults(data.getWeatherForecast);
      },
      onError: (error) => {
        console.error("Error fetching weather data:", error); // Log error
      },
    },
  );

  const handleSearch = async (searchTerm) => {
    console.log("Searching weather for:", searchTerm);

    getWeatherForecast({ variables: { city: searchTerm } });
  };

  return (
    <div className="w-1/4 bg-green-300 p-4">
      {/* User input */}
      <Input handleSearch={handleSearch} />
      {/* User search history */}
      <SearchHistory />
    </div>
  );
};

export default Sidebar;
