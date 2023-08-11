import styled from "styled-components/native";
import { Card, Chip } from "react-native-paper";

import { Text } from "../../../components/typography/TextComponent";

export const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-align: center;
`;

export const ProductCard = styled(Card)`
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
`;

export const ProductCardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: ${(props) => `${props.size}px`};
`;

export const ProductCardContent = styled(Card.Content)``;

export const ProductCartTitle = styled(Card.Title)``;

export const TitleNotFoundContainer = styled(Text)`
  top: 50%;
  text-align: center;
`;

export const ChipContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: ${(props) => props.theme.space[1]};
`;

export const Pill = styled(Chip)`
  background-color: ${(props) =>
    props.name === "Suitable"
      ? props.theme.colors.pill.suitable
      : props.theme.colors.pill.noSuitable};
`;
