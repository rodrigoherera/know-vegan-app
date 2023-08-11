import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./TabNavigator";

export const Navigator = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
