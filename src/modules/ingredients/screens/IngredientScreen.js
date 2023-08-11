import React, { useContext, useState, useEffect } from "react";
import { Button, FlatList, RefreshControl } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

import { IngredientsContext } from "../../../services/ingredients/IngredientsContext";
import {
  TitleNotFoundContainer,
  Title,
  IngredientCard,
  IngredientCardContent,
  IngredientCartTitle,
  IngredientItem,
  TitleFooter,
  SearchBarInput,
} from "../components/IngredientsStyles";
import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";
import {
  Loading,
  LoadingContainer,
} from "../../../components/utility/LoadingContainer";
import { Text } from "../../../components/typography/TextComponent";
import ErrorComponent from "../../../components/utility/ErrorComponent";

export const IngredientScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  const { ingredients, retrieveIngredients, totalPages, error } =
    useContext(IngredientsContext);

  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      await retrieveIngredients();
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setPage(1);
    await retrieveIngredients(1);
  };

  const handleLoadMore = async () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      await retrieveIngredients(newPage);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      const results = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredIngredients(results);
    } else {
      setFilteredIngredients(ingredients);
    }
  };

  const handleOnClose = () => {
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <Appbar.Header
        theme={theme}
        style={{ backgroundColor: colors.bg.primary }}
      >
        <Appbar.Content title={t("appBarIngredient")} />
        {open && (
          <SearchBarInput
            height="45px"
            mode="outlined"
            label={t("searchIngredient")}
            value={searchQuery}
            onChangeText={handleSearch}
            right={<TextInput.Icon name="close" onPress={handleOnClose} />}
          />
        )}
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setOpen(!open);
          }}
        />
      </Appbar.Header>
      {error && (
        <ErrorComponent
          errorMessage={error}
          onRetry={async () => {
            try {
              await retrieveIngredients(1);
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
      {ingredients.length <= 0 && !error && (
        <TitleNotFoundContainer>
          <Title variant="error">{t("ingredientNotFound")}</Title>
          <Button
            onPress={() => retrieveIngredients(1)}
            title={t("refreshIngredient")}
          />
        </TitleNotFoundContainer>
      )}
      {!error && (
        <FlatList
          extraData={ingredients}
          data={searchQuery.trim() !== "" ? filteredIngredients : ingredients}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          renderItem={({ item }) => {
            let tagName = "";
            item.Tags.forEach((tag) => {
              if (tag.name === "Suitable") {
                tagName = tag.name;
              }
            });
            return (
              <IngredientCard name={tagName}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("IngredientInfo", {
                      item,
                      tagName,
                    })
                  }
                >
                  <IngredientCartTitle title={item.name} name={tagName} />
                  <IngredientCardContent>
                    <IngredientItem name={tagName}>
                      {item.description}
                    </IngredientItem>
                  </IngredientCardContent>
                </TouchableOpacity>
              </IngredientCard>
            );
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListFooterComponent={
            <TitleFooter>
              {isRefreshing && !error && (
                <Loading
                  size={30}
                  animated={true}
                  color={colors.brand.primary}
                />
              )}
              {ingredients.length > 0 &&
                page >= totalPages &&
                searchQuery === "" &&
                !error && <Text>{t("noMoreIngredient")}</Text>}
            </TitleFooter>
          }
        />
      )}
    </>
  );
};
