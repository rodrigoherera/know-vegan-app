import React from "react";
import { Appbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { Text } from "../../../components/typography/TextComponent";
import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";
import {
  ProductCard,
  ProductCardCover,
  ChipContainer,
  Pill,
} from "../components/ProductCardStyles";

export const ProductInfo = ({ route, navigation }) => {
  const product = route.params;

  const { t } = useTranslation();

  const {
    id = 1,
    name = "Some product",
    description = "Some description",
    ingredients = "Some ingredients",
    Tags = ["Suitable", "No Suitable"],
    photo = "https://media.istockphoto.com/id/1031570676/photo/chocolate-dark-bitter-chocolate-chunks-chocolate-background.jpg?s=612x612&w=0&k=20&c=U0P2QdQ_FX2LkeN3v_z1TIU4s8YOIQfF7JbFYluYMY8=",
  } = product.item;

  return (
    <>
      <Appbar.Header
        theme={theme}
        style={{ backgroundColor: colors.bg.primary }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={name} />
      </Appbar.Header>
      <ProductCard>
        <ProductCardCover key={id} source={{ uri: photo }} size={300} />
        <Text variant="body">{t("productInfoDescription")}</Text>
        <Text variant="caption">{description}</Text>
        <Text variant="body">{t("productInfoIngredients")}</Text>
        <Text variant="caption">{ingredients}</Text>
        {Tags.map((item, index) => {
          const { name } = item;
          return (
            <ChipContainer key={index}>
              <Pill mode="outlined" name={name}>
                <Text variant="label">{name}</Text>
              </Pill>
            </ChipContainer>
          );
        })}
      </ProductCard>
    </>
  );
};
