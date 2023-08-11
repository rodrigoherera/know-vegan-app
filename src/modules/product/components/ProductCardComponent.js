import React from "react";
import { TouchableOpacity } from "react-native";

import { Text } from "../../../components/typography/TextComponent";
import {
  ProductCard,
  ProductCardCover,
  ProductCardContent,
  ChipContainer,
  Pill,
} from "./ProductCardStyles";
import { Favourite } from "../../../components/favourites/Favourites";

const ProductCardComponent = ({ product, onPress }) => {
  const { id, name, photo, Tags } = product;

  return (
    <ProductCard>
      <Favourite product={product} />
      <TouchableOpacity onPress={onPress}>
        <ProductCardCover key={id} source={{ uri: photo }} size={120} />
        <ProductCardContent>
          <Text variant="body">{name}</Text>
        </ProductCardContent>
        {Tags &&
          Tags.map((tag, index) => {
            const { name } = tag;
            return (
              <ChipContainer key={index}>
                <Pill mode="outlined" name={name}>
                  <Text variant="label">{name}</Text>
                </Pill>
              </ChipContainer>
            );
          })}
      </TouchableOpacity>
    </ProductCard>
  );
};

export default ProductCardComponent;
