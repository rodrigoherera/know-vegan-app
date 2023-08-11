import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/TextComponent";

export const CategoryList = styled(FlatList)`
  flex-direction: "row";
`;

export const CategoryContainerList = styled.View`
  flex-direction: "column";
  justify-content: center;
`;

export const TitleNotFoundContainer = styled.View`
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-align: center;
`;

export const TitleFooter = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;
