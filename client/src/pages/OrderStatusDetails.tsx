import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../constant";
import axios from "axios";
import { TErrorService, TOrder } from "../constant/types";
import { toastOption } from "../lib";
import { Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Copy, CopyCheck, MoveLeft } from "lucide-react";
import { Helmet } from "react-helmet";

function OrderStatusDetails() {
  const { orderId } = useParams();
  const router = useNavigate();
  const toast = useToast();
  const [order, setOrder] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCopyed, setIsCopyed] = useState(false);

  const copy = async (value: string) => {
    try {
      await window.navigator.clipboard.writeText(value);
      const option = toastOption("success", "تم عمل نسخ بالنجاح");
      toast(option);
      setIsCopyed(true);
    } catch (error) {
      const option = toastOption("error", "فشل في عمل نسخة");
      toast(option);
      setIsCopyed(false);
    }
  };

  const getOrder = async () => {
    if (!orderId) return;
    const url = BASE_URL + "/order/" + orderId;
    setLoading(true);
    try {
      const res = await axios.get(url);
      if (res.data?.success) {
        const order = res.data?.order as TOrder;
        setOrder(order);
      } else {
        const option = toastOption("error", "create order failed");
        toast(option);
        router(-1);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error || "خطأ أثناء العملية ");
      toast(option);
      router(-1);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Helmet>
        <title>order status</title>
        <meta name="description" content="sage" />
      </Helmet>
      <div className="flex flex-col">
        <div className="h-[175px]  relative md:h-[300px] bg-gray-50  w-full flex items-center justify-center">
          <div className="flex flex-col gap-y-2 text-gray-600 justify-center items-center">
            <h1 className="text-2xl md:text-4xl lg:text-6xl">حالة الطلب </h1>
            <p className="font-bold font-serif">{"رجوع إلى المتجر"}</p>
            <Link
              to={"/"}
              className="  hover:text-yellow-500 flex items-center gap-x-2"
            >
              <MoveLeft />
            </Link>
          </div>
          <img
            src="/log/logo_2.png"
            className="w-36 absolute bottom-[-30px]"
            alt="logo"
          />
        </div>
        {loading ? (
          <div className=" h-[200px] flex items-center justify-center">
            <Spinner color="blue" size={"xl"} />
          </div>
        ) : (
          <div className="mt-20 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4 p-3 md:p-5 border w-11/12 md:w-10/12 md:3/4 mx-auto bg-yellow-50 rounded-md shadow-lg">
              <h1 className="text-2xl">تفاصيل الطلبية</h1>
              <div className="flex flex-col gap-y-2">
                <hr />
                <div className="flex w-full px-3">
                  <p className="flex-[2] md:flex-[5]">المنتج</p>
                  <p className="flex-[2]">الكمية</p>
                  <p className="flex-[2] lg:flex-[3]">الثمن</p>
                </div>
                <hr />
              </div>
              {order?.products.map((product) => (
                <div className="flex w-full px-3" key={product.product._id}>
                  <p className="flex-[2] md:flex-[5]  overflow-x-auto">
                    {product.product.name +
                      product.productQuantity.quantity +
                      "g"}
                  </p>
                  <p className="flex-[2] font-medium">X {product.quantity}</p>
                  <p className="flex-[2] lg:flex-[3] font-medium ">
                    {product.product.price * product.productQuantity.number}{" "}
                    {product.product.currency}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-11/12 md:w-10/12 md:3/4 mx-auto flex flex-wrap gap-5">
              <div className="flex flex-col gap-y-3 border bg-yellow-50 p-5 rounded-md shadow-lg ">
                <h1 className="text-2xl">معلومات الطلبية</h1>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">رقم الطلبية</p>
                  <div className="flex items-center gap-x-2">
                    <p>:{order?._id.substring(0, 10) + "..."}</p>
                    {isCopyed ? (
                      <CopyCheck />
                    ) : (
                      <Copy
                        className="cursor-pointer"
                        onClick={() => {
                          if (!order?._id) return;
                          copy(order?._id);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">التاريخ</p>
                  <p>:{order?.createdAt.split("T")[0]}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">المجموع</p>
                  <p>:{order?.totalePrice + "MAD "}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">الطلب</p>:
                  {order?.isDelaiverd ? (
                    <p className="text-green-500">تم التوصل بالطلب</p>
                  ) : (
                    <p className="text-red-500">قيد التوصيل</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col min-w-[250px] gap-y-3 border bg-yellow-50 p-5 rounded-md shadow-lg ">
                <h1 className="text-2xl">العنوان</h1>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">المدينة</p>
                  <p>:{order?.address.city}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">البلد</p>
                  <p>:المغرب</p>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">الرقم البريدي </p>
                  <p>:{order?.address?.codePostal || "******"}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium"> العنوان</p>
                  <p>:{order?.address.streat}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderStatusDetails;
