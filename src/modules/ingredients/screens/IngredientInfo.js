import React from "react";
import { Appbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";
import {
  IngredientInfoContainer,
  IngredientInfoTitle,
  IngredientInfoAttributes,
} from "../components/IngredientsStyles";

export const IngredientInfo = ({ route, navigation }) => {
  const params = route.params;
  const { t } = useTranslation();

  const {
    id = 1,
    name = "Some ingredient",
    description = "Some description",
  } = params.item;

  return (
    <>
      <Appbar.Header
        theme={theme}
        style={{ backgroundColor: colors.bg.primary }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={name} />
      </Appbar.Header>
      <IngredientInfoContainer>
        <IngredientInfoTitle variant="body">
          {t("ingredientInfoName")}
        </IngredientInfoTitle>
        <IngredientInfoAttributes variant="caption">
          {name}
        </IngredientInfoAttributes>
        <IngredientInfoTitle variant="body">
          {t("ingredientInfoDescription")}
        </IngredientInfoTitle>
        <IngredientInfoAttributes variant="caption">
          {description}
        </IngredientInfoAttributes>
        <IngredientInfoTitle variant="body">
          {t("ingredientInfoSuitable")}
        </IngredientInfoTitle>
        <IngredientInfoAttributes variant="caption">
          {params.tagName === "Suitable" ? "Yes" : "No"}
        </IngredientInfoAttributes>
      </IngredientInfoContainer>
    </>
  );
};
