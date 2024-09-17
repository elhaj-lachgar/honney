import Banner from "../components/Banner";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Skeleton } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCardContext } from "../context/CardContextProvider";
import { Helmet } from "react-helmet";
import { useHomeProductContext } from "../context/HomeProductContext";
import Slider from "../components/Slider";

function Home() {
  const { clearCard } = useCardContext();
  const [search] = useSearchParams();
  const { ProductLoading, banner, bannerLoading, principalProduct, products } =
    useHomeProductContext();
  const router = useNavigate();
  if (search.get("order") == "success") {
    window.localStorage.removeItem("card");
    clearCard();
    router("/");
  }

  return (
    <>
      <Helmet>
        <title>sage cops</title>
        <meta name="description" content="saga" />
      </Helmet>
      <div className="flex flex-col gap-y-8 ">
        {<Banner loading={ProductLoading} productId={principalProduct?._id} />}
        {
          bannerLoading
          ?
          <Skeleton className=""/>
          :
          <Slider banner={banner}/>
        }
        <div className="flex flex-col w-11/12 gap-y-1 mx-auto">
          <p className="text-gray-500 text-sm">منتجات شائعة في المتجر</p>
          <h1 className="text-2xl font-serif flex items-center gap-x-1">
            منتجات
            <span className="border-b-[2px] border-[#dcb140]">رائجة</span>
          </h1>
        </div>
        <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-center gap-5  py-4 mx-auto w-11/12 ">
          {ProductLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} w={"300px"} h={"300px"} />
              ))}
            </>
          ) : (
            products.map((product) => (
              <Card product={product} key={product._id} />
            ))
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
