import React, { useContext, createContext, useState, useEffect } from "react";
import { BASE_URL } from "../constant";
import { toastOption } from "../lib";
import { TErrorService } from "../constant/types";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

type TContextNameProduct = {
  productsName: { name: string }[];
};

const ContextNameProduct = createContext<TContextNameProduct>({
  productsName: [],
});

function ProductNameContext({ children }: { children: React.ReactNode }) {
  const toast = useToast();
  const [productsName, setProductsName] = useState<{ name: string }[]>([]);
  const getNames = async () => {
    const url = BASE_URL + "/product/get-names";
    try {
      const res = await axios.get(url);
      if (res.data?.success) {
        setProductsName(res.data?.names);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error || "خطأ أثناء العملية ");
      toast(option);
    }
  };

  useEffect(() => {
    getNames();
  }, []);
  return (
    <ContextNameProduct.Provider value={{ productsName }}>
      {children}
    </ContextNameProduct.Provider>
  );
}

export default ProductNameContext;

export const useNameProductContext = () => useContext(ContextNameProduct);
