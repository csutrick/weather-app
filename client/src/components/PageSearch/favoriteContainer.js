import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

import { FaArrowDown } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";

const FavoriteContainer = ({ favorites }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const favoriteClick = (favorite) => {
    console.log(`Selected Favorite: ${favorite}`);
  };

  useEffect(() => {
    console.log("User favorites updated!", favorites)
  }, [favorites]);

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
            <div className="flex flex-col text-xl font-bold text-black">
              <p className="text-center text-xl font-bold text-black">
                Your Favorites
              </p>
              <div className="flex flex-row flex-wrap items-center justify-evenly space-x-4">
                {favorites.length > 0 ? (
                  favorites.map((favorite) => (
                    <div key={favorite} className="bg-gray-200 p-2">
                      <p
                        onClick={() => favoriteClick(favorite)}
                        className="pb-2 text-2xl font-bold text-black"
                      >
                        {favorite}
                      </p>
                      <button className="flex w-full items-center justify-center">
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
