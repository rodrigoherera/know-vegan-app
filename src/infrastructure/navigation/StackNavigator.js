import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CategoryScreen } from "../../modules/category/screens/CategoryScreen";
import { AddScreen } from "../../modules/add/screens/AddScreen";
import { ProductScreen } from "../../modules/product/screens/ProductScreen";
import { ProductInfo } from "../../modules/product/screens/ProductInfo";
import { IngredientScreen } from "../../modules/ingredients/screens/IngredientScreen";
import { IngredientInfo } from "../../modules/ingredients/screens/IngredientInfo";
import { FavouriteScreen } from "../../modules/favourites/screens/FavouritesScreen";
import Search from "../../modules/category/components/SearchComponent";
import { ProfileScreen } from "../../modules/profile/screens/ProfileScreen";

const Stack = createStackNavigator();

const createScreenOptions = () => {
  return {
    headerShown: false,
    fullScreenGestureEnabled: true,
  };
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={createScreenOptions}>
      <Stack.Screen name="Categories" component={CategoryScreen} />
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        initialParams={{ categoryName: "some-category-name" }}
      />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

const AddStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={createScreenOptions}>
      <Stack.Screen name="AddProduct" component={AddScreen} />
    </Stack.Navigator>
  );
};

const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={createScreenOptions}>
      <Stack.Screen name="FavoritesProducts" component={FavouriteScreen} />
    </Stack.Navigator>
  );
};

const IngredientsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={createScreenOptions}>
      <Stack.Screen name="IngredientsList" component={IngredientScreen} />
      <Stack.Screen name="IngredientInfo" component={IngredientInfo} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={createScreenOptions}>
      <Stack.Screen name="ProfileInfo" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  AddStackNavigator,
  FavoritesStackNavigator,
  IngredientsStackNavigator,
  ProfileStackNavigator,
};
