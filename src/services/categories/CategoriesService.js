import camelize from "camelize";

import instance from "../../infrastructure/client/httpClient";

export const getCategoriesRequest = (page, limit) => {
  const endpoint = `category?page=${page}&limit=${limit}`;
  return instance.get(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const transformCategories = (categories) => {
  return camelize(categories);
};

export const buildCategoryItems = (categories) => {
  const categoriesName = categories.map((item) => [item.id, item.name]);
  return categoriesName.map((item) => ({
    label: item[1],
    value: item[0],
  }));
};
