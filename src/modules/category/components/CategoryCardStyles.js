import styled from "styled-components";
import { Card } from "react-native-paper";

import { Text } from "../../../components/typography/TextComponent";

export const CategoryCard = styled(Card)`
  margin: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.ui.card};
`;

export const CategoryCardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.ui.card};
  padding: ${(props) => props.theme.space[1]};
  height: 150px;
`;

export const CategoryCardContent = styled(Card.Content)``;

export const CategoryCardContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const CategoryCardInfo = styled.View`
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary}; ;
`;
