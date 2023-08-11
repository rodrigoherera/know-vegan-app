import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import styled from "styled-components/native";

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Loading = styled(ActivityIndicator)`
  margin-left: ${(props) => (props.margin ? `-${props.margin}px` : `0px`)};
`;
