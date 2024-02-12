import React from "react";
import { FaHeart } from "react-icons/fa";

const FavoriteIcon = ({
  searchResults,
  favorites,
  Setfavorites,
  profileId,
}) => {
  const checkIfFavorite = () => {
    const isFavorite = favorites.includes(searchResults.city);

    console.log(isFavorite ? "Favorite" : "Not a favorite");
  };
  return (
    <div className="absolute right-4 top-4">
      <FaHeart onClick={checkIfFavorite} className="text-4xl text-gray-400" />
    </div>
  );
};

export default FavoriteIcon;
