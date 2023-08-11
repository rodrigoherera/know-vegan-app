import React, { useState, useContext } from "react";
import { Modal, Pressable, Keyboard } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

import { colors } from "../../../infrastructure/theme/colors";
import { SpacerComponent } from "../../../components/utility/SpaceComponent";
import {
  AddBackground,
  AddContainer,
  AddCover,
  AddInput,
  AddDropdown,
  Title,
  AddButton,
  AddImageButton,
  AddImageContainer,
  AddModalImage,
  AddModalButton,
  AddShowImageButton,
  AddModalImageContainer,
  AddContainerTagOption,
} from "../components/AddScreenStyles";
import { CustomSnackbar } from "../../../components/utility/SnackbarComponent";
import { CategoriesContext } from "../../../services/categories/CategoriesContext";
import { postProduct } from "../../../services/products/ProductsService";
import TagsButton from "../components/TagsButton";
import { Tags, getValueFromTag } from "../enum/Tags";
import { useTranslation } from "react-i18next";

export const AddScreen = () => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const { retrieveCategoryIdAndName } = useContext(CategoriesContext);

  const [categoryItems, setCategoryItems] = useState(
    retrieveCategoryIdAndName()
  );

  const [name, setName] = useState("");
  const [description, setDescripton] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState({
    uri: "",
    name: "",
    type: "",
    base64: "",
  });
  const [imageSelected, setImageSelect] = useState(false);
  const [tagName, setTagName] = useState(Tags[1]);

  const [errorName, setErrorName] = useState(false);
  const [errorDescripton, setErrorDescripton] = useState(false);
  const [errorIngredients, setErrorIngredients] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [errorCategoryId, setErrorCategoryId] = useState(false);

  const { t } = useTranslation();

  const onDismissSnackBar = () => setVisible(false);
  const hideKeyboard = () => Keyboard.dismiss();

  const resetStates = () => {
    setName("");
    setDescripton("");
    setIngredients("");
    setImage({
      uri: "",
      name: "",
      type: "",
      base64: "",
    });
    setImageSelect(false);
    setTagName(Tags[1]);
  };

  const handleSelectTag = (option) => {
    setTagName(option);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      // Resize the image if it's larger than 2MB
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [],
        {
          compress: 0.9,
          format: ImageManipulator.SaveFormat.JPEG,
          maxFileSize: 2 * 1024 * 1024, // Set the maximum file size to 2MB
        }
      );

      const base64Image = await FileSystem.readAsStringAsync(manipResult.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setImage({
        uri: manipResult.uri,
        name: "image.jpg",
        type: "image/jpeg",
        base64: base64Image,
      });
      setImageSelect(true);
    }
  };

  const onSaveProduct = () => {
    setLoading(true);

    const nameError = !name.trim();
    const descriptionError = !description.trim();
    const ingredientsError = !ingredients.trim();
    const imageError = !imageSelected;
    const categoryIdError = !categoryId;

    setErrorName(nameError);
    setErrorDescripton(descriptionError);
    setErrorIngredients(ingredientsError);
    setErrorImage(imageError);
    setErrorCategoryId(categoryIdError);

    if (
      !nameError &&
      !descriptionError &&
      !ingredientsError &&
      !imageError &&
      !categoryIdError
    ) {
      postProduct(
        name,
        description,
        ingredients,
        categoryId,
        image.type,
        image.base64,
        getValueFromTag(tagName)
      )
        .then((result) => {
          if (result.data.success) {
            setLoading(false);
            setVisible(true);
            setError(false);
            setMessage(t("addSuccessMsg"));
            resetStates();
          }
        })
        .catch((err) => {
          console.error(err.data);
          setError(true);
          setMessage(err.data.message);
          setVisible(true);
          setLoading(false);
          return;
        });
    } else {
      setError(true);
      setMessage(t("addIncompleteFieldMsg"));
      setVisible(true);
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <AddBackground>
        <Pressable onPress={hideKeyboard}>
          <AddCover />
          <Title>{t("appBarAdd")}</Title>
          <AddContainer>
            <AddInput
              error={errorName}
              label={t("addName").toUpperCase()}
              mode="outlined"
              value={name}
              onChangeText={(text) => setName(text)}
              outlineColor={colors.brand.primary}
            />
            <SpacerComponent size="large" />
            <AddInput
              error={errorDescripton}
              label={t("addDescription").toUpperCase()}
              mode="outlined"
              height="70px"
              value={description}
              onChangeText={(text) => setDescripton(text)}
              outlineColor={colors.brand.primary}
            />
            <SpacerComponent size="large" />
            <AddInput
              error={errorIngredients}
              label={t("addIngredients").toUpperCase()}
              mode="outlined"
              height="70px"
              value={ingredients}
              onChangeText={(text) => setIngredients(text)}
              outlineColor={colors.brand.primary}
            />
            <SpacerComponent size="large" />
            {imageSelected && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
              >
                <AddModalImageContainer>
                  <AddModalImage source={{ uri: image.uri }} />
                  <SpacerComponent size="small" />
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <AddModalButton mode="contained">X</AddModalButton>
                  </Pressable>
                </AddModalImageContainer>
              </Modal>
            )}
            <AddImageContainer>
              <AddImageButton
                icon="camera"
                onPress={pickImage}
                mode="outlined"
                error={errorImage}
              >
                {t("addLoadPhoto").toUpperCase()}
              </AddImageButton>
              <SpacerComponent size="small" />
              <AddShowImageButton
                onPress={() => setModalVisible(true)}
                mode="outlined"
                disabled={!image}
              >
                {t("addLookPhoto").toUpperCase()}
              </AddShowImageButton>
            </AddImageContainer>

            <SpacerComponent size="large" />
            <AddDropdown
              open={open}
              value={categoryId}
              items={categoryItems}
              setOpen={setOpen}
              setValue={setCategoryId}
              setItems={setCategoryItems}
              error={errorCategoryId}
              placeholder={t("addCategory").toUpperCase()}
            />
            <SpacerComponent size="large" />
            <AddContainerTagOption>
              <TagsButton
                type={Tags[1]}
                selected={tagName === Tags[1]}
                onSelect={handleSelectTag}
              />
              <TagsButton
                type={Tags[2]}
                selected={tagName === Tags[2]}
                onSelect={handleSelectTag}
              />
            </AddContainerTagOption>
            <SpacerComponent size="large" />
            {loading ? (
              <ActivityIndicator
                animating={true}
                color={colors.brand.primary}
              />
            ) : (
              <AddButton icon="plus" mode="contained" onPress={onSaveProduct}>
                {t("addProduct").toUpperCase()}
              </AddButton>
            )}
          </AddContainer>
        </Pressable>
      </AddBackground>
      <CustomSnackbar
        isError={error}
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        message={message}
      />
    </>
  );
};
