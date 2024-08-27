import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { TProductService } from "../../constant/types";
import { BASE_URL } from "../../constant";
import { toastOption } from "../../lib";
import { Spinner, useToast } from "@chakra-ui/react";

function UpdateProductPage() {
  const [products, setProducts] = useState<TProductService[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const getProducts = () => {
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="w-11/12 flex mx-auto flex-wrap justify-center gap-5">
        {loading ? (
          <div className=" flex h-screen w-full justify-center items-center">
            <Spinner colorScheme="blue" size={"xl"} />
          </div>
        ) : (
          products.map((product) => (
            <Card isAdmin={true} product={product} key={product._id} />
          ))
        )}
      </div>
    </div>
  );
}

export default UpdateProductPage;
