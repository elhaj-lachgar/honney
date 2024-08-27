import { createContext, useContext, useEffect, useState } from "react";
import { TProductService } from "../constant/types";
import { useToast } from "@chakra-ui/react";
import { toastOption } from "../lib";

type TWishContext = {
  products: TProductService[];
  addProduct: (product: TProductService) => void;
  deleteProduct: (product: TProductService) => void;
  clearList: () => void;
};

const initialize: TWishContext = {
  addProduct: () => {},
  deleteProduct: () => {},
  clearList: () => {},
  products: [],
};

const WishListContext = createContext<TWishContext>(initialize);

function WishListContextProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<TProductService[]>([]);
  const toast = useToast();
  const addProduct = (product: TProductService) => {
    const arr = Array.from(new Set([...products, product]));
    setProducts(arr);
    const option = toastOption("success",`تمت اضافة ${product.name}`);

    window.localStorage.setItem(
      "wishlist",
      JSON.stringify({
        products: arr,
      })
    );
    toast(option);
  };
  const deleteProduct = (product: TProductService) => {
    const arr = products.filter((pr) => pr._id != product._id);
    setProducts(arr);
    const option = toastOption("success", `تمت ازالة ${product.name}`);
    window.localStorage.setItem(
      "wishlist",
      JSON.stringify({
        products: arr,
      })
    );
    toast(option);
  };

  const clearList = () => {
    setProducts([]);
    window.localStorage.setItem("wishlist", JSON.stringify({ products: [] }));
  };
  useEffect(() => {
    if (!window.localStorage.getItem("wishlist")) return;
    const list = JSON.parse(localStorage.getItem("wishlist") as string)
      ?.products as TProductService[];
    if (!list) return;
    setProducts(list);
  }, []);
  return (
    <WishListContext.Provider
      value={{ addProduct, deleteProduct, products, clearList }}
    >
      {children}
    </WishListContext.Provider>
  );
}

export default WishListContextProvider;

export const useWishListContext = () => {
  return useContext(WishListContext);
};
