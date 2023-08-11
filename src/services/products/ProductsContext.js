import React, { useState, createContext } from "react";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
