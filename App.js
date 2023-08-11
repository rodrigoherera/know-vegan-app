import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { I18nextProvider } from "react-i18next";

import i18n from "./src/infrastructure/language/i18n";
import { Navigator } from "./src/infrastructure/navigation";
import { theme } from "./src/infrastructure/theme";

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Navigator />
        </ThemeProvider>
        <ExpoStatusBar style="auto" />
      </I18nextProvider>
    </>
  );
}
