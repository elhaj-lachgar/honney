import { MoveLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCardContext } from "../context/CardContextProvider";
import { useEffect, useState } from "react";
import { TOrder } from "../constant/types";
import { BASE_URL } from "../constant";
import axios from "axios";
import { toastOption } from "../lib";
import { Spinner, useToast } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const ConfirmPage = () => {
  const { orderId } = useParams();
  const { clearCard } = useCardContext();
  const router = useNavigate();
  const toast = useToast();
  const [order, setOrder] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(true);

  const getOrder = async () => {
    if (!orderId) return;
    const url = BASE_URL + "/order/" + orderId;
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
    } catch (error) {
      const option = toastOption("error", "create order failed");
      toast(option);
      router(-1);
    }
  };

  useEffect(() => {
    getOrder().finally(() => setLoading(false));
    clearCard();
  }, []);

  return (
    <>
      <Helmet>
        <title>{"confirm"}</title>
        <meta name="description" content={`confirmation page`} />
      </Helmet>{" "}
      <div className="flex flex-col gap-y-6 pb-20 ">
        <div className="flex flex-col items-center gap-y-3 justify-center h-[300px] bg-yellow-500">
          <h1 className="text-white text-2xl">تم تأكيد الطلبية</h1>
          <p> سيتم تواصل معكم عما قريب</p>
          <Link
            to={"/?order=success"}
            className="  hover:text-white flex items-center gap-x-2"
          >
            <MoveLeft />
          </Link>
        </div>
        {loading ? (
          <div className="flex w-full h-[200px]  items-center justify-center">
            <Spinner color="#0075FF" size={"xl"} />
          </div>
        ) : (
          <>
            <h1 className="text-center text-xl w-11/12 mx-auto md:text-4xl text-yellow-500">
              Thank you. Your order has been received.
            </h1>
            <div className="flex flex-col gap-y-4 p-3 md:p-5 border w-11/12 md:w-10/12 md:3/4 mx-auto bg-yellow-50 rounded-md shadow-lg">
              <h1 className="text-2xl">Order Details</h1>
              <div className="flex flex-col gap-y-2">
                <hr />
                <div className="flex w-full px-3">
                  <p className="flex-[2] md:flex-[5]">Product</p>
                  <p className="flex-[2]">Quantity</p>
                  <p className="flex-[2] lg:flex-[3]">Price</p>
                </div>
                <hr />
              </div>
              {order?.products.map((product) => (
                <div className="flex w-full px-3" key={product.product._id}>
                  <p  className="flex-[2] md:flex-[5]  overflow-x-auto">
                    {product.product.name + product.productQuantity.quantity + "ml"}
                  </p>
                  <p className="flex-[2] font-medium">X {product.quantity}</p>
                  <p className="flex-[2] lg:flex-[3] font-medium ">
                    {product.product.price  * product.productQuantity.number} {product.product.currency}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-11/12 md:w-10/12 md:3/4 mx-auto flex flex-wrap gap-5">
              <div className="flex flex-col gap-y-3 border bg-yellow-50 p-5 rounded-md shadow-lg ">
                <h1 className="text-2xl">Order Info</h1>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">Order Id</p>
                  <p>:{order?._id}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">Date</p>
                  <p>:{order?.createdAt.split("T")[0]}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">Totale</p>
                  <p>:{order?.totalePrice + "MAD "}</p>
                </div>
              </div>
              <div className="flex flex-col min-w-[250px] gap-y-3 border bg-yellow-50 p-5 rounded-md shadow-lg ">
                <h1 className="text-2xl">Billing Address</h1>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">City</p>
                  <p>:{order?.address.city}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">Country</p>
                  <p>morocco</p>
                </div>
                <div className="flex items-center">
                  <p className="w-[100px] font-medium">Postcode </p>
                  <p>:{order?.address?.codePostal || "******"}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ConfirmPage;
