import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/products/all");
      setProducts(res.data.products);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    setProducts,
    refreshProducts: fetchProducts,
    loading,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
}
