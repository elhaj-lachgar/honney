import { Button, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TProductService } from "../../constant/types";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { toastOption } from "../../lib";
import axios from "axios";

function BannerAdmin() {
  const [products, setProducts] = useState<TProductService[]>([]);
  const [bannerProduct, setBannerProduct] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);
  const toast = useToast();

  const getBanner = async () => {
    const url = BASE_URL + "/banner/only";
    try {
      const res = await axios.get(url);
      if (res.data?.success) {
        const products = res.data?.banner.products as TProductService[];
        const arr = products.map((pro) => pro._id);
        setBannerProduct(arr);
      }
    } catch (error) {
      const option = toastOption("error", "featching error");
      toast(option);
    }
  };

  const getProducts = async () => {
    let url = `${BASE_URL}/product/all`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            const product = data.products;
            setProducts(product);
          } else {
            const option = toastOption("error", "featching error");
            toast(option);
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      const option = toastOption("error", "featching error");
      toast(option);
    }
  };

  const setBanner = async () => {
    const url = BASE_URL + "/banner/set-banner";
    if (bannerProduct.length <= 0) return;
    const data = JSON.stringify({ productIds: bannerProduct });
    setBannerLoading(true);
    try {
      const res = await axios.put(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        setLoad(!load);
      } else {
        const option = toastOption("error", "error of set banner");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "error of set banner");
      toast(option);
    }
    setBannerLoading(false);
  };

  useEffect(() => {
    getBanner();
    getProducts();
  }, [load]);

  return (
    <div className="flex flex-col p-5">
      <div className="mt-5 flex flex-col p-1 gap-y-5 border min-h-[100px] w-full rounded-md shadow-md">
        <h1 className="text-gray-500 underline">Banner</h1>
        <div className="flex flex-col gap-y-2.5">
          {loading ? (
            <div className="flex items-center justify-center ">
              <Spinner />
            </div>
          ) : (
            products.map((product) => (
              <div className="flex gap-x-2" key={product._id}>
                <input
                  type="checkbox"
                  id="name"
                  defaultChecked={bannerProduct.includes(product._id)}
                  onChange={() => {
                    if (!bannerProduct.includes(product._id)) {
                      setBannerProduct([...bannerProduct, product._id]);
                      return;
                    } else {
                      const arr = bannerProduct.filter(
                        (pr) => pr != product._id
                      );
                      setBannerProduct(arr);
                    }
                  }}
                />
                <label htmlFor="name" className="flex flex-col">
                  <img
                    src={product.imageUrls[0]}
                    className="w-16 h-16"
                    alt="image of title"
                  />
                </label>
              </div>
            ))
          )}
        </div>
        <Button
          colorScheme="blue"
          isLoading={bannerLoading}
          onClick={setBanner}
        >
          set Banner
        </Button>
      </div>
    </div>
  );
}

export default BannerAdmin;
