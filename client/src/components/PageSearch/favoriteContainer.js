import React, { useEffect, useState } from "react";
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
    <section className="flex h-auto w-full items-center justify-center bg-orange-300 p-2">
      <FaArrowDown
        onClick={() => setIsCollapsed((prevCollapsed) => !prevCollapsed)}
        className={`absolute right-2 top-2 text-2xl text-black ${isCollapsed ? "rotate-180" : "rotate-0"}`}
      />
      {Auth.loggedIn() ? (
        <>
          {isCollapsed ? (
            <p className="text-xl font-bold text-black">Your Favorites</p>
          ) : (
            <div className="w-full flex flex-col text-xl font-bold text-black">
              <p className="text-center text-xl font-bold text-black mb-2">
                Your Favorites
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-row w-full gap-2">
                {favorites.length > 0 ? (
                  favorites.map((favorite) => (
                    <div key={favorite} className="bg-gray-200 flex flex-col flex-nowrap">
                      <p
                        onClick={() => favoriteClick(favorite)}
                        className="w-full text-center"
                      >
                        {favorite}
                      </p>
                      <button
                        onClick={() => deleteFavorite(favorite)}
                        className="flex w-full items-center justify-center"
                      >
                        <BsFillTrashFill className="text-red-400" />
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
          <Link className="px-3 py-1 text-lg font-bold text-black" to="/login">
            Login
          </Link>
          <p className="text-base font-bold text-black">or</p>
          <Link className="px-3 py-1 text-lg font-bold text-black" to="/signup">
            Signup
          </Link>
        </span>
      )}
    </section>
  );
};

export default FavoriteContainer;
