import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { theme } from "../../../infrastructure/theme";
import { Text } from "../../../components/typography/TextComponent";

const Container = styled.View`
    padding: 10px;
`;

const Title = styled(Text)`
  font-size: 20px;
  text-align: center;
`;

export const ProfileScreen = () => {
  const [open, setOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const [value, setValue] = useState(i18n.language);
  const [items, setItems] = useState([
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
  ]);

  return (
    <>
      <Appbar.Header
        theme={theme}
        style={{ backgroundColor: colors.bg.primary }}
      >
        <Appbar.Content title={t("appBarProfile")} />
      </Appbar.Header>
      <Title>{t("changeLanguage")}</Title>
      <Container>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(item) => i18n.changeLanguage(item.value)}
        />
      </Container>
    </>
  );
};
