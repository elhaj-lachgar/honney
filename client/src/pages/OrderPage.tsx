import { Verified } from "lucide-react";
import AdressModule from "../components/profile/AdressModule";
import { toastOption } from "../lib/index";
import { Button, Skeleton, useToast } from "@chakra-ui/react";
import { useCardContext } from "../context/CardContextProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { BASE_URL, DEFAULT_HEADER } from "../constant";
import axios from "axios";
import { TErrorService, TOrder } from "../constant/types";
import { Helmet } from "react-helmet";
import NotAuthAddressModule from "../components/NotAuthAddressModule";
import AddressItem from "../components/AddressItem";
import { useAddressContext } from "../context/AddressContextProvider";

function OrderPage() {
  const { card } = useCardContext();
  const {
    addresses,
    load,
    setLoad,
    loading: addressLoading,
  } = useAddressContext();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useNavigate();
  const { authUser } = useAuthContext();

  const CreateOrderHandler = async () => {
    if (!selectedAddress) return;
    const url = `${BASE_URL}/order`;
    const card_ = card.products.map((item) => {
      return {
        _id: item.product._id,
        quantity: item.quantity,
        quantitySelected: item.productQuantity._id,
      };
    });
    const data = JSON.stringify({ card: card_, address: selectedAddress });
    setLoading(true);
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      const Object_data = res.data;
      if (Object_data?.success) {
        const order = Object_data?.order as TOrder;
        const option = toastOption("success", "تم إرسال الطلب");
        toast(option);
        router("/confirm/" + order._id);
      } else {
        const option = toastOption("error", "خطّأ في عملية");
        toast(option);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error || "خطّأ في عملية");
      toast(option);
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>{"order"}</title>
        <meta name="description" content={`order page`} />
      </Helmet>{" "}
      <main className="flex flex-col lg:flex-row pt-10 gap-5  px-5">
        <div className="flex flex-col h-fit w-full gap-y-1 lg:w-2/3 bg-white border rounded-md">
          <div className=" px-3 flex items-center gap-x-2 py-3">
            <Verified />
            إتمام البيع
          </div>
          <hr />
          <div className=" w-full h-full flex flex-col overflow-auto px-3 py-2 gap-y-2 ">
            {addressLoading ? (
              <Skeleton w={"full"} h={"12"} borderRadius={"10px"} />
            ) : (
              addresses.map((address) => (
                <AddressItem
                  address={address}
                  key={address._id}
                  load={load}
                  setLoad={setLoad}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                  isProfile={true}
                />
              ))
            )}
          </div>
          <hr />
          <div className="w-full  p-2">
            {authUser ? (
              <AdressModule load={load} setLoad={setLoad} />
            ) : (
              <NotAuthAddressModule load={load} setLoad={setLoad} />
            )}
          </div>
        </div>
        <div className="flex flex-col h-fit  gap-y-3 lg:w-1/3 w-full p-2  border rounded shadow">
          <div className="flex items-center justify-between">
            <h1>
              سلة مشتريات{" "}
              <span className="text-yellow-500 ">({card.products.length})</span>
            </h1>
            {card.products[0] && (
              <b>{card.totalePrice + card.products[0].product.currency}</b>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            {card.products.map((product) => (
              <div
                className="flex items-center gap-x-3 p-2 border rounded "
                key={product.product._id}
              >
                <img
                  src={product.product.imageUrls[0]}
                  alt="image of card"
                  className="w-20 rounded-md h-20 "
                />
                <div className="flex flex-col">
                  <h1>{product.product.name}</h1>
                  <p
                    dir="ltr"
                    className="text-end border rounded w-fit p-0.5 bg-gray-50"
                  >{`${product.productQuantity.quantity} g`}</p>
                  <p>
                    {product.quantity} *{" "}
                    {product.product.price * product.productQuantity.number +
                      product.product.currency}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              disabled={selectedAddress != ""}
              cursor={selectedAddress != "" ? "pointer " : "not-allowed"}
              onClick={() => {
                if (!selectedAddress) {
                  const option = toastOption("error", "إختر العنوان");
                  toast(option);
                } else {
                  CreateOrderHandler();
                }
              }}
              bg={"#dcb140"}
              _hover={{
                backgroundColor: "rgb(254 240 138)",
              }}
              width={"100%"}
              color={"white"}
              isLoading={loading}
            >
              تأكيد
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderPage;
