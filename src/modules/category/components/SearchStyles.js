import React, { useState } from "react";
import { View, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const SearchView = styled.View`
  flex: 1;
  padding: 16px;
`;

const SearchResultsText = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
`;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Perform search logic here based on the query
    // and update the searchResults state accordingly
    const filteredResults = categories.flatMap((category) =>
      category.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setSearchResults(filteredResults);
  };

  return (
    <SearchView>
      <Searchbar
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {searchResults.length > 0 ? (
        <View>
          <SearchResultsText>Search Results:</SearchResultsText>
          {searchResults.map((product) => (
            <Text key={product.id}>{product.name}</Text>
          ))}
        </View>
      ) : null}
    </SearchView>
  );
};

export default Search;
