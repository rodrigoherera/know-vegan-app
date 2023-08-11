import React from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: #2196f3;
  padding: 10px;
  border-radius: 5px;
`;

const RetryText = styled.Text`
  color: white;
  font-size: 16px;
`;

const ErrorComponent = ({ errorMessage, onRetry }) => {
  const { t } = useTranslation();
  return (
    <ErrorContainer>
      <ErrorText>{errorMessage}</ErrorText>
      {onRetry && (
        <RetryButton onPress={onRetry}>
          <RetryText>{t("refreshCategory")}</RetryText>
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

export default ErrorComponent;
