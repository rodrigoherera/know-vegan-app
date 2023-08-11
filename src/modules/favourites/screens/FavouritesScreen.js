import React, { useContext } from "react";
import { Appbar } from "react-native-paper";
import { FlatList } from "react-native";

import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";

import { SpacerComponent } from "../../../components/utility/SpaceComponent";
import {
  Title,
  TitleNotFoundContainer,
} from "../../product/components/ProductCardStyles";
import ProductCardComponent from "../../product/components/ProductCardComponent";

import { FavouritesContext } from "../../../services/favourites/FavouritesContext";
import { useTranslation } from "react-i18next";

export const FavouriteScreen = ({ navigation, route }) => {
  const { favourites } = useContext(FavouritesContext);
  const { t } = useTranslation();

  return (
    <>
      <Appbar.Header
        theme={theme}
        style={{ backgroundColor: colors.bg.primary }}
      >
        <Appbar.Content title={t("appBarFavourites")} />
      </Appbar.Header>
      {favourites.length === 0 && (
        <TitleNotFoundContainer>
          <Title variant="error">{t("favouritesNotFound")}</Title>
        </TitleNotFoundContainer>
      )}
      <SpacerComponent size="medium" />
      {!favourites ? null : (
        <FlatList
          data={favourites}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <ProductCardComponent
                product={item}
                onPress={() => navigation.navigate("ProductInfo", { item })}
              />
            );
          }}
        />
      )}
    </>
  );
};
