import { Image, Modal, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, TextInput } from "react-native-paper";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/TextComponent";
import { colors } from "../../../infrastructure/theme/colors";

export const AddBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AddContainer = styled.View`
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AddCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const AddInput = styled(TextInput)`
  background-color: white;
  height: ${(props) => (props.height ? props.height : `50px`)};
  width: 300px;
  font-size: ${(props) => props.theme.fontSizes.caption}; ;
`;

export const AddDropdown = styled(DropDownPicker)`
  width: 300px;
  border: ${(props) =>
    props.error
      ? `solid ${props.theme.colors.ui.error}`
      : `dashed ${colors.brand.primary}`};
`;

export const Title = styled(Text)`
  font-size: 30px;
  text-align: center;
`;

export const AddButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const AddImageButton = styled(Button).attrs((props) => ({
  color: props.error ? colors.ui.error : colors.brand.primary,
}))`
  background-color: white;
  padding: ${(props) => props.theme.space[2]};
  border: ${(props) =>
    props.error ? `solid ${props.theme.colors.ui.error}` : `none`};
`;

export const AddShowImageButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  background-color: white;
  padding: ${(props) => props.theme.space[2]};
`;

export const AddModalButton = styled(Button).attrs({
  color: colors.ui.error,
})`
  width: 50px;
  padding: ${(props) => props.theme.space[2]};
`;

export const AddModalImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); ;
`;

export const AddImageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const AddModalImage = styled(Image)`
  width: 300px;
  height: 300px;
`;

export const AddContainerTagOption = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TagOptionButton = styled(TouchableOpacity)`
  background-color: ${(props) =>
    props.selected
      ? props.type === "Suitable"
        ? props.theme.colors.pill.suitable
        : props.theme.colors.pill.noSuitable
      : props.theme.colors.text.disabled};
  border-radius: 5px;
  flex: 1;
  margin: 5px;
  padding: 10px;
`;

export const TagButtonText = styled(Text)`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.default
      : props.theme.colors.text.primary};
  font-size: 16px;
  text-align: center;
`;
