import { createContext, useContext, useEffect, useState } from "react";
import { TCategory } from "../constant/types";
import { BASE_URL } from "../constant";
import axios from "axios";

type TCategoryContext = {
  categorys: TCategory[];
  categoryLoading: boolean;
};

const CategoryContext = createContext<TCategoryContext>({
  categoryLoading: true,
  categorys: [],
});

function CategoryContextProvider({ children }: { children: React.ReactNode }) {
  const [categorys, setCategorys] = useState<TCategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const getCategorys = async () => {
    const url = BASE_URL + "/category";
    try {
      const res = await axios.get(url);
      if (res?.data.success) {
        setCategorys(res.data.categorys);
      } else {
        throw new Error("Could not find category");
      }
    } catch (error) {
      console.error(error);
    }
    setCategoryLoading(false);
  };

  useEffect(() => {
    getCategorys();
  }, []);
  return (
    <CategoryContext.Provider value={{ categoryLoading, categorys }}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryContextProvider;



export const useCategoryContext = () => useContext(CategoryContext);