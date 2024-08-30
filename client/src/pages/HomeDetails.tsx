import { Button, Skeleton, useToast } from "@chakra-ui/react";
import { toastOption } from "../lib";
import { Heart, ShoppingBasket } from "lucide-react";
import StarRating from "react-star-ratings";
import Card from "../components/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TErrorService, TProductService } from "../constant/types";
import { useEffect, useState } from "react";
import { useWishListContext } from "../context/WishListContextProvider";
import { useCardContext } from "../context/CardContextProvider";
import ImageModule from "../components/_modules/ImageModule";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../constant";
import axios from "axios";
import Bar from "../components/Bar";
import ReviewItem from "../components/ReviewItem";
import CreateReviewComp from "../components/CreateReviewComp";

function HomeDetails() {
  const { id } = useParams();
  const [choise, setChoise] = useState("description");
  const router = useNavigate();
  const [reviewValue, setReviewValue] = useState(false);
  const [load, setLoad] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [product, setProduct] = useState<TProductService | null>(null);
  const [loading, setLoading] = useState(true);
  const { products, addProduct, deleteProduct } = useWishListContext();
  const [related, setRelated] = useState<TProductService[]>([]);
  const { addToCard } = useCardContext();
  const toast = useToast();

  const getProduct = async () => {
    if (!id) return;
    const url = `${BASE_URL}/product/related-products/${id}`;
    try {
      const res = await axios.get(url);
      const Object_data = res.data;
      if (Object_data.success) {
        const product_ = Object_data.product as TProductService;
        setSelectedQuantity(product_?.productQuantity[0]._id || "");
        setProduct(Object_data.product);
        setRelated(Object_data.related);
        setReviewValue(Object_data.value);
      }
    } catch (error:any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error || "خطأ أثناء العملية ");
      toast(option);
    }
  };

  useEffect(() => {
    getProduct().finally(() => setLoading(false));
  }, [load]);

  const isLiked = products.findIndex((product) => product._id == id) > -1;

  const location: { name: string; link: string }[] = [];

  if (product) {
    location.push({
      link: "/search/" + product.category._id,
      name: product.category.name,
    });
    location.push({
      link: "/" + product._id,
      name: product.name,
    });
  }

  const finalPrice = product?.productQuantity.find(
    (p) => p._id == selectedQuantity
  );

  return (
    <>
      {!loading ? (
        <Helmet>
          <title>{product?.name}</title>
          <meta name="description" content={`page of ${product?.name}`} />
        </Helmet>
      ) : (
        <Helmet>
          <title>...loading</title>
          <meta name="description" content="loading" />
        </Helmet>
      )}

      <div className="flex flex-col p-3 gap-y-7 ">
        {loading ? (
          <div className="flex flex-col ">
            <div className="flex flex-col lg:flex-row  lg:items-center gap-x-7  ">
              <div className=" w-full lg:flex-1 ">
                <Skeleton h={"96"} w={"full"} />
              </div>
              <div className="flex-1 flex flex-col mt-4 lg:mt-0 gap-y-4 lg:p-4">
                <Skeleton h={"5"} w={"16"} />
                <Skeleton h={"5"} w={"16"} />
                <h2 className="flex items-center gap-x-5">
                  <Skeleton h={"5"} w={"16"} />
                  <Skeleton h={"5"} w={"16"} />
                </h2>
                <h2 className="flex items-center gap-x-5">
                  <Skeleton h={"5"} w={"16"} />
                  <Skeleton h={"5"} w={"16"} />
                </h2>
                <hr />
                <Skeleton h={"5"} w={"full"} />
                <div className="flex items-center gap-x-5">
                  <Skeleton h={"5"} w={"16"} />
                  <Skeleton h={"7"} w={"16"} />
                  <Skeleton h={"7"} w={"16"} />
                </div>
                <Skeleton h={"7"} w={"7"} />
              </div>
            </div>
            <div className=" relative flex flex-col w-full max-h-[500px] gap-y-4 py-2     mx-auto">
              <div className="w-full h-full border  flex flex-col ">
                <Skeleton w={"full"} h={"36"} />
              </div>
              <div className="flex flex-col   gap-y-1 mx-auto">
                <Skeleton h={"7"} w={"36"} />
                <h1 className="text-2xl font-serif flex items-center gap-x-1">
                  <Skeleton h={"7"} w={"36"} />
                </h1>
              </div>
              <div className=" flex flex-wrap gap-10 w-11/12 mx-auto justify-center">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} w={"300px"} h={"300px"} />
                ))}
              </div>
            </div>
          </div>
        ) : product ? (
          <div className="flex flex-col">
            <div className="py-2.5">
              {location && <Bar location={location} />}
            </div>
            <div className="flex flex-col lg:flex-row  lg:items-center gap-x-7  ">
              <div className=" w-full lg:flex-1  relative ">
                <ImageModule image={product?.imageUrls} />
              </div>
              <div className="flex-1 flex flex-col mt-4 lg:mt-0 gap-y-4 lg:p-4">
                <h1 className="text-4xl font-serif">{product?.name}</h1>
                <h1 className="text-2xl flex  items-center gap-x-2 font-bold text-gray-400">
                  <span className="text-lg">{product?.currency}</span>
                  {product?.price * (finalPrice?.number || 1)}
                </h1>
                <div className="">
                  <Button
                    bg={"#dcb140"}
                    _hover={{
                      backgroundColor: "#F9C349",
                    }}
                    color={"white"}
                    size={"lg"}
                    onClick={() => {
                      if (!finalPrice) {
                        const option = toastOption(
                          "error",
                          "Please select quantity"
                        );
                        toast(option);
                        return;
                      }
                      addToCard(product, finalPrice);
                      router("/order");
                    }}
                  >
                    شراء الآن
                  </Button>
                </div>
                <h2 className="flex items-center gap-x-5">
                  <span>التصنيف: </span>
                  {product.category.name}
                </h2>
                <h2 className="flex items-center gap-x-5">
                  مستودع :
                  <span className="text-green-500">{product.stock}</span>
                </h2>

                <h2 className="flex items-center gap-x-5">
                  كمية:
                  <div className="flex items-center gap-x-1">
                    {product.productQuantity.map((pr) => (
                      <div
                        dir="ltr"
                        key={pr._id}
                        className={`bg-gray-50 p-0.5 rounded border cursor-pointer ${
                          selectedQuantity == pr._id && "text-yellow-500"
                        }`}
                        onClick={() => setSelectedQuantity(pr._id)}
                      >
                        {pr.quantity + " ml"}
                      </div>
                    ))}
                  </div>
                </h2>
                <hr />
                <p>{product.subDescription}</p>
                <div className="flex items-center gap-x-5">
                  <Button
                    bg={"#dcb140"}
                    _hover={{
                      backgroundColor: "#F9C349",
                    }}
                    color={"white"}
                    leftIcon={<ShoppingBasket />}
                    onClick={() => {
                      console.log(finalPrice);
                      if (!finalPrice) {
                        const option = toastOption(
                          "error",
                          "Please select quantity"
                        );
                        toast(option);
                        return;
                      }
                      addToCard(product, finalPrice);
                    }}
                  >
                    إضافة إلى سلة
                  </Button>
                </div>
                <Heart
                  onClick={() => {
                    if (!isLiked) {
                      addProduct(product);
                      return;
                    }
                    deleteProduct(product);
                  }}
                  className={`bottom-1.5  cursor-pointer right-1.5 p-1  size-8 ${
                    !isLiked ? "color bg-gray-100" : "text-white bg-color"
                  } rounded-full `}
                />
              </div>
            </div>
            <div className=" relative flex flex-col w-full max-h-[500px] gap-y-4 mt-4    mx-auto">
              <div className="w-full h-full border  flex flex-col ">
                <div className="bg-yellow-100 border flex items-center p-2 gap-x-5 justify-center">
                  <label
                    htmlFor="description"
                    className={`p-2 cursor-pointer rounded-2xl ${
                      choise == "description"
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-50 text-black"
                    }`}
                    onClick={() => setChoise("description")}
                  >
                    وصف{" "}
                  </label>
                  <label
                    htmlFor="reviews"
                    className={`p-2 cursor-pointer rounded-2xl ${
                      choise == "review"
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-50 text-black"
                    }`}
                    onClick={() => setChoise("review")}
                  >
                    تقيمات
                  </label>
                </div>
                {choise == "description" && (
                  <p className="p-5 text-start overflow-auto no-scrollbar">
                    {product.description}
                  </p>
                )}
                {choise == "review" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col p-5 ">
                      <div className="flex flex-col lg:flex-row items-center gap-x-3">
                        <div className="flex-1 w-full h-full flex flex-col justify-center bg-yellow-100 rounded items-center p-4 ">
                          <h1> تقيمات</h1>
                          <h1 className="text-gray-700 text-xl font-semibold">
                            {product.productRate &&
                              Math.floor(product.productRate * 100) / 100}
                          </h1>
                          ({product.reviews.length} تقيمات)
                        </div>
                        <div className="flex-1 flex-col flex gap-y-1">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-x-1">
                              {product.rating_info?.five_star} نجمة{" "}
                              <StarRating
                                starDimension="20px"
                                starSpacing="1px"
                                starRatedColor="yellow"
                                starHoverColor="yellow"
                                rating={5}
                              />
                            </div>
                            <div className="flex items-center gap-x-1">
                              {product.rating_info?.four_star} نجمة{" "}
                              <StarRating
                                starDimension="20px"
                                starSpacing="1px"
                                starRatedColor="yellow"
                                starHoverColor="yellow"
                                rating={4}
                              />
                            </div>
                            <div className="flex items-center gap-x-1">
                              {product.rating_info?.three_star} نجمة{" "}
                              <StarRating
                                starDimension="20px"
                                starSpacing="1px"
                                starRatedColor="yellow"
                                starHoverColor="yellow"
                                rating={3}
                              />
                            </div>
                            <div className="flex items-center gap-x-1">
                              {product.rating_info?.two_star} نجمة{" "}
                              <StarRating
                                starDimension="20px"
                                starSpacing="1px"
                                starRatedColor="yellow"
                                starHoverColor="yellow"
                                rating={2}
                              />
                            </div>
                            <div className="flex items-center gap-x-1">
                              {product.rating_info?.one_star} نجمة{" "}
                              <StarRating
                                starDimension="20px"
                                starSpacing="1px"
                                starRatedColor="yellow"
                                starHoverColor="yellow"
                                rating={1}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-4 mt-5 overflow-auto no-scrollbar">
                        {product.reviews.map((review) => (
                          <ReviewItem
                            key={review._id}
                            review={review}
                            load={load}
                            setLoad={setLoad}
                            productId={product._id}
                          />
                        ))}
                      </div>
                    </div>
                    <CreateReviewComp
                      value={reviewValue}
                      key={product._id}
                      productId={product._id}
                      load={load}
                      setLoad={setLoad}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col   gap-y-1 mx-auto">
                <h1 className="text-2xl font-serif flex items-center gap-x-1">
                  منتجات
                  <span className="border-b-[2px] border-[#dcb140]">
                    دات صلة
                  </span>
                </h1>
              </div>
              <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-center gap-5  py-4 mx-auto w-11/12 ">
                {related.map((product_info) => {
                  if (product_info._id == id) return null;
                  return <Card product={product_info} key={product_info._id} />;
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <img
              src="/NotFound/product.png"
              className="w-44 md:w-56 lg:w-64"
              alt="not found page"
            />
            <p className="md:text-xl text-red-500 ">المنتح غير موجود</p>
            <Link to="/" className="hover:underline text-yellow-500">
              العودة إلى المتجر
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default HomeDetails;
