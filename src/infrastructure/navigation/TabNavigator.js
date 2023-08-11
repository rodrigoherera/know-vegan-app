import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  MainStackNavigator,
  AddStackNavigator,
  IngredientsStackNavigator,
  FavoritesStackNavigator,
  ProfileStackNavigator,
} from "./StackNavigator";

import { colors } from "../theme/colors";
import { CategoriesContextProvider } from "../../services/categories/CategoriesContext";
import { ProductsContextProvider } from "../../services/products/ProductsContext";
import { IngredientsContextProvider } from "../../services/ingredients/IngredientsContext";
import { FavouritesContextProvider } from "../../services/favourites/FavouritesContext";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();

  const TAB_ICON = {
    Home: { focused: "md-home", unfocused: "md-home-outline" },
    Add: { focused: "add-circle", unfocused: "add-circle-outline" },
    Ingredients: { focused: "list", unfocused: "list-outline" },
    Favourites: { focused: "heart", unfocused: "heart-outline" },
    Profile: { focused: "person", unfocused: "person-outline" },
  };

  const TAB_LABELS = {
    Home: "tabBarHome",
    Add: "tabBarAdd",
    Ingredients: "tabBarIngredients",
    Favourites: "tabBarFavourites",
    Profile: "tabBarProfile",
  };

  const TAB_NAME_MAPPING = {
    [t(TAB_LABELS.Home)]: "Home",
    [t(TAB_LABELS.Add)]: "Add",
    [t(TAB_LABELS.Ingredients)]: "Ingredients",
    [t(TAB_LABELS.Favourites)]: "Favourites",
    [t(TAB_LABELS.Profile)]: "Profile",
  };

  const createScreenOptions = ({ route }) => {
    const englishName = TAB_NAME_MAPPING[route.name]; // map translated name back to English
    return {
      headerShown: false,
      tabBarActiveTintColor: colors.brand.primary,
      tabBarInactiveTintColor: colors.brand.muted,
      tabBarIcon: ({ focused, color, size }) => {
        const iconSet = TAB_ICON[englishName]; // use English name here

        if (!iconSet) {
          console.warn(`Icon not found for route: ${englishName}`);
          return null; // or return a default icon if you have one
        }

        const iconName = focused ? iconSet.focused : iconSet.unfocused;
        return <Ionicons name={iconName} color={color} size={size} />;
      },
    };
  };

  return (
    <FavouritesContextProvider>
      <CategoriesContextProvider>
        <ProductsContextProvider>
          <IngredientsContextProvider>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen
                name={t(TAB_LABELS.Home)}
                component={MainStackNavigator}
              />
              <Tab.Screen
                name={t(TAB_LABELS.Ingredients)}
                component={IngredientsStackNavigator}
              />
              <Tab.Screen
                name={t(TAB_LABELS.Favourites)}
                component={FavoritesStackNavigator}
              />
              <Tab.Screen
                name={t(TAB_LABELS.Add)}
                component={AddStackNavigator}
              />
              <Tab.Screen
                name={t(TAB_LABELS.Profile)}
                component={ProfileStackNavigator}
              />
            </Tab.Navigator>
          </IngredientsContextProvider>
        </ProductsContextProvider>
      </CategoriesContextProvider>
    </FavouritesContextProvider>
  );
};

export default BottomTabNavigator;
