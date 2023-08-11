import React from "react";

import {
  CategoryCard,
  Title,
  CategoryCardCover,
  CategoryCardContent,
} from "./CategoryCardStyles";

export const CategoryCardComponent = ({ category }) => {
  return (
    <CategoryCard>
      <CategoryCardCover key={category.id} source={{ uri: category.photo }} />
      <CategoryCardContent>
        <Title>{category.name}</Title>
      </CategoryCardContent>
    </CategoryCard>
  );
};
