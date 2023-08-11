import instance from "../../infrastructure/client/httpClient";

export const getIngredientsRequest = (page, limit) => {
  const endpoint = `ingredient?page=${page}&limit=${limit}`;
  return instance.get(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
