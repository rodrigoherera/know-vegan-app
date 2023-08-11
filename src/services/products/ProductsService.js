import "react-native-get-random-values";
import { nanoid } from "nanoid";

import instance from "../../infrastructure/client/httpClient";

export const postProduct = (
  name,
  description,
  ingredients,
  categoryId,
  imageType,
  imageBase64,
  tagId
) => {
  // Define the URL endpoint to make the request to
  const endpoint = `product`;

  // Define the data to be sent in the request
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("ingredients", ingredients);
  formData.append("imageName", nanoid());
  formData.append("type", imageType);
  formData.append("base64", imageBase64);
  formData.append("categoryID", categoryId);
  formData.append("tags", tagId);

  // Make the request with Axios
  return instance.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
