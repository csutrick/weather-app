import React, { useEffect, useMemo } from "react";
import { useMutation } from "@apollo/client";

import { ADD_FAVORITE, REMOVE_FAVORITE } from "../../utils/mutations";
import { FaHeart } from "react-icons/fa";

const FavoriteIcon = ({
  searchResults,
  favorites,
  setFavorites,
  profileId,
}) => {
  const [addFavorite] = useMutation(ADD_FAVORITE, {
    onError: (error) => console.error("Error adding favorite:", error.message),
    onCompleted: () => {
      setFavorites((prevFavorites) => [searchResults.city, ...prevFavorites]);
    },
  });
  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    onError: (error) =>
      console.error("Error removing favorite:", error.message),
    onCompleted: () => {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item !== searchResults.city),
      );
    },
  });

  const isFavorite = useMemo(
    () => favorites.includes(searchResults.city),
    [favorites, searchResults.city],
  );

  const toggleFavorite = async () => {
    const variables = { profileId, favorite: searchResults.city };

    try {
      if (isFavorite) {
        await removeFavorite({ variables });
      } else {
        await addFavorite({ variables });
      }
    } catch (error) {
      console.error("Error in toggleFavorite:", error.message);
    }
  };

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
