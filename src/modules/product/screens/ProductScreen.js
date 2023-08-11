import React, { useContext } from "react";
import { FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { Title, TitleNotFoundContainer } from "../components/ProductCardStyles";
import { SpacerComponent } from "../../../components/utility/SpaceComponent";

import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";

import { ProductsContext } from "../../../services/products/ProductsContext";
import ProductCardComponent from "../components/ProductCardComponent";

export const ProductScreen = ({ navigation, route }) => {
  const { categoryName } = route.params;
  const { products } = useContext(ProductsContext);
  const { t } = useTranslation();

  return (
    <>
      <Appbar.Header
        theme={theme}
        style={{ backgroundColor: colors.bg.primary }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={categoryName} />
      </Appbar.Header>
      {!products && (
        <TitleNotFoundContainer>
          <Title variant="error">{t("productNotFound")}</Title>
        </TitleNotFoundContainer>
      )}
      <SpacerComponent size="medium" />
      {!products ? null : (
        <FlatList
          data={products}
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
