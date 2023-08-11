import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FavouritesContext } from "../../services/favourites/FavouritesContext";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 9;
`;

export const Favourite = ({ product }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = favourites.find((r) => r.id === product.id);

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite ? addToFavourites(product) : removeFromFavourites(product)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
