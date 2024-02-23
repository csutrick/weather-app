import React from "react";
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
    onCompleted: (data) => {
      setFavorites([searchResults.city, ...favorites]);
    },
  });

  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    onError: (error) =>
      console.error("Error removing favorite:", error.message),
    onCompleted: (data) => {
      setFavorites(favorites.filter((city) => city !== searchResults.city));
    },
  });

  const isFavorite = favorites.includes(searchResults.city);

  const toggleFavorite = async () => {
    const variables = { profileId, favorite: searchResults.city };
    console.log("Toggling favorite", searchResults.city);

    if (isFavorite) {
      await removeFavorite({ variables });
    } else {
      await addFavorite({ variables });
    }
  };

  return (
    <div className="absolute right-4 top-4">
      <FaHeart
        onClick={toggleFavorite}
        className={`text-4xl hover:scale-110 drop-shadow-md hover:drop-shadow-lg transition-all duration-100 ease-in ${isFavorite ? "text-red-500" : "text-gray-300"}`}
      />
    </div>
  );
};

export default FavoriteIcon;
