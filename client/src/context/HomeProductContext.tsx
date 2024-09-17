import { createContext, useContext, useEffect, useState } from "react";
import { TBanner, TErrorService, TProductService } from "../constant/types";
import { BASE_URL } from "../constant";
import axios from "axios";
import { toastOption } from "../lib";
import { useToast } from "@chakra-ui/react";

type THomeProductContext = {
  products: TProductService[];
  ProductLoading: boolean;
  principalProduct: TProductService | null;
  banner: TBanner[];
  bannerLoading: boolean;
};

const HomeProductContext = createContext<THomeProductContext>({
  ProductLoading: true,
  principalProduct: null,
  products: [],
  banner : [],
  bannerLoading : true
});

function HomeProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [banner, setBanner] = useState<TBanner[]>([]);
  const toast = useToast();
  const [products, setProducts] = useState<TProductService[]>([]);
  const [ProductLoading, setProductLoading] = useState(false);
  const [principalProduct, setPrincipalProduct] =
    useState<TProductService | null>(null);

  const [bannerLoading, setBannerLoading] = useState(true);

  const getBanner = async () => {
    const url = `${BASE_URL}/banner`;
    try {
      const res = await axios.get(url);
      const data = res.data;
      if (data?.success) {
        setBanner(data.banner);
      } else {
        throw new Error("error featching banner");
      }
    } catch (error) {
      const option = toastOption("error", "error fetching data");
      toast(option);
    }
    setBannerLoading(false);
  };

  const getProducts = () => {
    const url = `${BASE_URL}/product`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            const product = data.products as TProductService[];
            const pP =
              product.find((p) => p.name == "عسل الزعتر") || products[0];

            setPrincipalProduct(pP);
            setProducts(product);
          } else {
            const option = toastOption("error", "featching error");
            toast(option);
          }
        })
        .finally(() => setProductLoading(false));
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error || "خطأ أثناء العملية ");
      toast(option);
    }
  };

  useEffect(() => {
    getProducts();
    getBanner();
  }, []);

  return (
    <HomeProductContext.Provider
      value={{
        banner,
        bannerLoading,
        principalProduct,
        ProductLoading,
        products,
      }}
    >
      {children}
    </HomeProductContext.Provider>
  );
}

export default HomeProductContextProvider;

export const useHomeProductContext = () => useContext(HomeProductContext);
