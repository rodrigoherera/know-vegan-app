import React, { useState, useContext } from "react";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { CategoriesContext } from "../../../services/categories/CategoriesContext";
import ProductCardComponent from "../../product/components/ProductCardComponent";
import { SpacerComponent } from "../../../components/utility/SpaceComponent";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";

const Search = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { categories } = useContext(CategoriesContext);
  const { t } = useTranslation();

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = categories.flatMap(
      (category) =>
        category.products?.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        ) || []
    );
    setSearchResults(filteredResults);
  };

  return (
    <SafeArea>
      <Searchbar
        placeholder={t("searchProduct")}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <SpacerComponent size="medium" />
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
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
      ) : null}
    </SafeArea>
  );
};

export default Search;
