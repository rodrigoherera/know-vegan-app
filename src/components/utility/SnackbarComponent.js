import React from "react";
import styled from "styled-components/native";
import { Snackbar } from "react-native-paper";

export const SnackBarComponent = styled(Snackbar)`
  background-color: ${(props) =>
    props.isError
      ? props.theme.colors.ui.error
      : props.theme.colors.ui.success};
  color: ${(props) =>
    props.isError
      ? props.theme.colors.text.primary
      : props.theme.colors.text.default};
`;

export const CustomSnackbar = ({
  visible,
  onDismiss,
  duration,
  message,
  isError,
}) => {
  return (
    <SnackBarComponent
      isError={isError}
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      action={{
        label: "Dismiss",
        onPress: () => {
          onDismiss();
        },
      }}
    >
      {message}
    </SnackBarComponent>
  );
};
