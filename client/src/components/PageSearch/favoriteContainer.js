import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REMOVE_FAVORITE } from "../../utils/mutations";

import Auth from "../../utils/auth";

import { FaArrowDown } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";

const FavoriteContainer = ({ favorites, setSearchTerm, profileId }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    onError: (error) =>
      console.error("Error removing favorite:", error.message),
  });

  const favoriteClick = (favorite) => {
    console.log(`Selected Favorite: ${favorite}`);

    setSearchTerm(favorite);
  };

  const deleteFavorite = (favorite) => {
    const variables = { profileId, favorite };
    console.log(`Deleting Favorite: ${favorite}`);

    removeFavorite({ variables });
  };

  return (
    <section className="z-30 flex h-auto w-full items-center justify-center bg-blue-200 p-2 drop-shadow-lg">
      <FaArrowDown
        onClick={() => setIsCollapsed((prevCollapsed) => !prevCollapsed)}
        className={`absolute right-2 top-2 text-2xl text-gray-600 ${isCollapsed ? "rotate-180" : "rotate-0"}`}
      />
      {Auth.loggedIn() ? (
        <>
          {isCollapsed ? (
            <p className="text-xl font-bold text-gray-600">Your Favorites</p>
          ) : (
            <div className="flex w-full flex-col text-xl font-bold text-black">
              <p className="mb-2 text-center text-xl font-bold text-gray-600">
                Your Favorites
              </p>
              <div className="grid w-full grid-flow-row grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {favorites.length > 0 ? (
                  favorites.map((favorite) => (
                    <div
                      key={favorite}
                      className="flex flex-col flex-nowrap rounded-lg bg-gray-100 drop-shadow-md transition-all
                      duration-100 ease-in hover:scale-105 hover:bg-gray-200 hover:drop-shadow-lg"
                    >
                      <p
                        onClick={() => favoriteClick(favorite)}
                        className="w-full text-center text-gray-600"
                      >
                        {favorite}
                      </p>
                      <button
                        onClick={() => deleteFavorite(favorite)}
                        className="group flex w-full items-center justify-center"
                      >
                        <BsFillTrashFill className="text-gray-400 transition-all duration-100 ease-in hover:text-red-400 group-hover:scale-105" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-base text-black">No Favorites Found</p>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <span className="flex flex-row items-center justify-center">
          <Link
            className="px-3 py-1 text-lg font-bold text-gray-600"
            to="/login"
          >
            Login
          </Link>
          <p className="text-base font-bold text-gray-600">or</p>
          <Link
            className="px-3 py-1 text-lg font-bold text-gray-600"
            to="/signup"
          >
            Signup
          </Link>
        </span>
      )}
    </section>
  );
};

export default FavoriteContainer;
