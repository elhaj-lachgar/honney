import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Categorys from "../components/Categorys";
import Footer from "../components/Footer";
import { toastOption } from "../lib";
import { TProductService } from "../constant/types";
import { BASE_URL } from "../constant";
import { Skeleton, useToast } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCardContext } from "../context/CardContextProvider";
import { Helmet } from "react-helmet";

function Home() {
  const [products, setProducts] = useState<TProductService[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { clearCard } = useCardContext();
  const [search] = useSearchParams();
  const router = useNavigate();
  if (search.get("order") == "success") {
    window.localStorage.removeItem("card");
    clearCard();
    router("/");
  }

  const getProducts = () => {
    const url = `${BASE_URL}/product`;
    try {
      setLoading(true);
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
    <>
      <Helmet>
        <title>sage cops</title>
        <meta name="description" content="saga" />
      </Helmet>
      <div className="flex flex-col gap-y-8 ">
        <Banner />
        <Categorys />
        <div className="flex flex-col w-11/12 gap-y-1 mx-auto">
          <p className="text-gray-500 text-sm">منتجات شائعة في متتج</p>
          <h1 className="text-2xl font-serif flex items-center gap-x-1">
            منتجات
            <span className="border-b-[2px] border-[#dcb140]">رائجة</span>
          </h1>
        </div>
        <div className=" grid grid-cols-1 max-w-screen-xl md:grid-cols-2 lg:grid-cols-3 gap-5 content-center md:content-around py-4 mx-auto  w-11/12 ">
          {loading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} w={"300px"} h={"300px"} />
              ))}
            </>
          ) : (
            products.map((product) => (
              <Card product={product} isAdmin={false} key={product._id} />
            ))
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
