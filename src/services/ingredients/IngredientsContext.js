import React, { useState, createContext } from "react";

import { getIngredientsRequest } from "./IngredientsService";

export const IngredientsContext = createContext();

export const IngredientsContextProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const retrieveIngredients = (newPage = 1, limit = 10) => {
    setIsLoading(true);
    getIngredientsRequest(newPage, limit)
      .then((results) => {
        const fetchedIngredients = results.data.data;
        const metadata = results.data.metadata;
        setTotalPages(metadata.total_pages);
        setIngredients((prevIngredients) => {
          return newPage === 1
            ? fetchedIngredients
            : [...prevIngredients, ...fetchedIngredients];
        });
        setError(null)
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "An unknown error occurred.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <IngredientsContext.Provider
      value={{
        ingredients,
        isLoading,
        error,
        retrieveIngredients,
        totalPages,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
};
