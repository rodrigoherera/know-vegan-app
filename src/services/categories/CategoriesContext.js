import React, { useState, createContext, useEffect } from "react";

import {
  getCategoriesRequest,
  buildCategoryItems,
} from "./CategoriesService";

export const CategoriesContext = createContext();

export const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const retrieveCategories = (newPage = 1, limit = 10) => {
    setIsLoading(true);
    getCategoriesRequest(newPage, limit)
      .then((results) => {
        const fetchedCategories = results.data.data;
        const metadata = results.data.metadata;
        setTotalPages(metadata.total_pages);
        setCategories((prevCategories) => {
          return newPage === 1 ? fetchedCategories : [...prevCategories, ...fetchedCategories];
        });
        setError(null)
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "An unknown error occurred.");
      })
      .finally(() => setIsLoading(false));
  };

  const retrieveCategoryIdAndName = () => {
    return buildCategoryItems(categories);
  };

  useEffect(() => {
    if (categories) {
      retrieveCategories();
    }
  }, [setCategories]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        error,
        retrieveCategoryIdAndName,
        retrieveCategories,
        totalPages,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
