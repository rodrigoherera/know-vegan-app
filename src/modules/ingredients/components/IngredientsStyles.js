import styled from "styled-components/native";
import { Card, TextInput } from "react-native-paper";

import { Text } from "../../../components/typography/TextComponent";
import { colors } from "../../../infrastructure/theme/colors";

export const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-align: center;
`;

export const TitleNotFoundContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  align-items: center;
`;

export const IngredientCard = styled(Card)`
  margin: ${(props) => props.theme.space[1]};
  background-color: ${(props) =>
    props.name === "Suitable"
      ? props.theme.colors.pill.suitable
      : props.theme.colors.pill.noSuitable};
`;

export const IngredientCardContent = styled(Card.Content)``;

export const IngredientCartTitle = styled(Card.Title).attrs((props) => ({
  titleStyle: {
    color:
      props.name === "Suitable" ? colors.text.default : colors.text.primary,
  },
}))``;

export const IngredientItem = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  color: ${(props) =>
    props.name === "Suitable"
      ? props.theme.colors.text.default
      : props.theme.colors.text.primary};
`;

export const IngredientInfoContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

export const IngredientInfoTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const IngredientInfoAttributes = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const SearchBarInput = styled(TextInput)`
  background-color: white;
  height: ${(props) => (props.height ? props.height : `50px`)};
  width: 310px;
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const TitleFooter = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;
