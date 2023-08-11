import React, { useContext, useState } from "react";
import { Button, FlatList, RefreshControl, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import { colors } from "../../../infrastructure/theme/colors";
import { ProductsContext } from "../../../services/products/ProductsContext";
import { CategoriesContext } from "../../../services/categories/CategoriesContext";

import { CategoryCardComponent } from "../components/CategoryCardComponent";
import ErrorComponent from "../../../components/utility/ErrorComponent";

import {
  Loading,
  LoadingContainer,
} from "../../../components/utility/LoadingContainer";

import { CategoryCardContainer } from "../components/CategoryCardStyles";
import { theme } from "../../../infrastructure/theme";
import { Appbar } from "react-native-paper";
import {
  Title,
  TitleFooter,
  TitleNotFoundContainer,
} from "../components/CategoryScreenStyles";
import { Text } from "../../../components/typography/TextComponent";

const CategoryCard = ({ category, setProducts, navigation }) => {
  return (
    <CategoryCardContainer>
      <TouchableOpacity
        onPress={() => {
          setProducts(category.products);
          navigation.navigate("Products", {
            categoryName: category.name,
          });
        }}
      >
        <CategoryCardComponent category={category} />
      </TouchableOpacity>
    </CategoryCardContainer>
  );
};

export const CategoryScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const { isLoading, categories, retrieveCategories, totalPages, error } =
    useContext(CategoriesContext);

  const { setProducts } = useContext(ProductsContext);

  const { t } = useTranslation();

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await retrieveCategories(1);
    setRefreshing(false);
  };

  const handleLoadMore = async () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      await retrieveCategories(newPage);
    }
  };

  return (
    <>
      <Appbar.Header
        theme={theme}
        style={{ backgroundColor: colors.bg.primary }}
      >
        <Appbar.Content title={t("home")} />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            navigation.navigate("Search");
          }}
        />
      </Appbar.Header>
      {error && (
        <ErrorComponent
          errorMessage={error}
          onRetry={async () => {
            try {
              await retrieveCategories(1);
            } catch (err) {
              console.error("Failed to retrieve categories:", err);
            }
          }}
        />
      )}
      {isLoading && (
        <LoadingContainer>
          <Loading
            margin={25}
            size={50}
            animated={true}
            color={colors.brand.primary}
          />
        </LoadingContainer>
      )}
      {categories.length <= 0 && !error && (
        <TitleNotFoundContainer>
          <Title variant="error">{t("categoriesNotFound")}</Title>
          <Button
            onPress={() => retrieveCategories(1)}
            title={t("refreshCategory")}
          />
        </TitleNotFoundContainer>
      )}
      {!error && (
        <FlatList
          numColumns={2}
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <CategoryCard
                category={item}
                setProducts={setProducts}
                navigation={navigation}
              />
            );
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            <TitleFooter>
              {isLoading && !error && (
                <Loading
                  size={30}
                  animated={true}
                  color={colors.brand.primary}
                />
              )}
              {categories.length > 0 && page >= totalPages && !error && (
                <Text>{t("noMoreCategories")}</Text>
              )}
            </TitleFooter>
          }
        />
      )}
    </>
  );
};
