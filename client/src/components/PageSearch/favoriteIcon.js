import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { ADD_FAVORITE, REMOVE_FAVORITE } from "../../utils/mutations";

import { FaHeart } from "react-icons/fa";

const FavoriteIcon = ({
  searchResults,
  favorites,
  Setfavorites,
  profileId,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    const favorite = searchResults.city;
    const isFavorite = favorites.includes(favorite);

    if (isFavorite) {
      console.log(favorite, "removed from favorites");
    } else {
      console.log(favorite, "added too favorites");
    }
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  // Happens every search
  useEffect(() => {
    const isFavorite = favorites.includes(searchResults.city);

    if (isFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [searchResults]);

  return (
    <div className="absolute right-4 top-4">
      <FaHeart
        onClick={toggleFavorite}
        className={`text-4xl ${isFavorite ? "text-red-500" : "text-gray-300"}`}
      />
    </div>
  );
};

export default FavoriteIcon;
