import React from "react";

const SearchResults = ({ searchResults }) => {
  return (
    <div className="flex w-full flex-col items-center py-2">
      <div className="flex w-full flex-col items-center">
        <h2 className="border-b-4 border-gray-600 px-4 text-6xl font-bold capitalize tracking-wider text-gray-600 drop-shadow-lg sm:text-5xl md:text-6xl">
          {searchResults.city}
        </h2>
        <h3 className="w-full pt-4 text-center text-4xl font-bold text-gray-600 drop-shadow-md md:text-5xl">
          {searchResults.forecast.list[0].main.temp}&deg;F
        </h3>
        <h3 className="w-full text-center text-xl tracking-wide text-gray-600 drop-shadow-md md:text-2xl">
          {searchResults.forecast.list[0].wind.speed} MPH Wind
        </h3>
        <h3 className="w-full text-center text-xl tracking-wide text-gray-600 drop-shadow-md md:text-2xl">
          {searchResults.forecast.list[0].main.humidity}% Humidity
        </h3>
        <span className="flex w-full flex-row flex-nowrap justify-center text-lg font-bold text-gray-600 drop-shadow-md md:text-xl">
          L:{searchResults.forecast.list[0].main.temp_min}&deg; | H:
          {searchResults.forecast.list[0].main.temp_max}&deg;
        </span>
      </div>
      <h3 className="mt-8 border-b-4 border-gray-600 px-6 text-center text-4xl font-bold text-gray-600 drop-shadow-md">
        Forcast:
      </h3>
      <div className="w-full space-y-4 p-4">
        {Array.isArray(searchResults.forecast.list) &&
          searchResults.forecast.list.map((item, index) => {
            if (index !== 0 && index % 8 === 0) {
              const timestamp = new Date(item.dt * 1000);
              const dateString = timestamp.toLocaleDateString();

              return (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-lg bg-white drop-shadow-md"
                >
                  <h2 className="border-b-2 border-gray-600 text-xl font-bold tracking-widest text-gray-600 md:text-2xl">
                    {dateString}
                  </h2>
                  <h2 className="my-1 text-2xl font-bold text-gray-600 md:my-2 md:text-3xl lg:text-4xl">
                    {item.main.temp}&deg;F
                  </h2>
                  <div className="flex w-full flex-row flex-nowrap justify-evenly">
                    <h2 className="lg:tex-2xl text-gray-600 md:text-lg md:font-bold lg:tracking-wide">
                      {item.wind.speed} MPH Wind
                    </h2>
                    <h2 className="lg:tex-2xl text-gray-600 md:text-lg md:font-bold lg:tracking-wide">
                      {item.main.humidity}% Humidity
                    </h2>
                    <h2 className="lg:tex-2xl text-gray-600 md:text-lg md:font-bold lg:tracking-wide">
                      L:{item.main.temp_min} | H:{item.main.temp_max}
                    </h2>
                  </div>
                </div>
              );
            }
            return null; // Skip other indices
          })}
      </div>
    </div>
  );
};

export default SearchResults;
