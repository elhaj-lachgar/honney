import { Button, Input, useToast } from "@chakra-ui/react";
import {
  resolver,
  TOrderStatusCredentials,
} from "../validator/order-check-validator";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContextProvider";
import { BASE_URL, DEFAULT_HEADER } from "../constant";
import axios from "axios";
import { toastOption } from "../lib";
import { TOrder } from "../constant/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
function OrderStatusPage() {
  const { authUser } = useAuthContext();
  const toast = useToast();
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TOrderStatusCredentials>({
    resolver,
  });

  const submitHandler = async (params: TOrderStatusCredentials) => {
    if (authUser) return;
    const url = BASE_URL + "/order/order-status";
    const data = JSON.stringify(params);
    setLoading(true);
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const order = res.data.order as TOrder;
        router("/order-status/" + order._id);
      } else {
        const option = toastOption("error", "order not found");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "order not found");
      toast(option);
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>حالة الطلب</title>
        <meta name="description" content="saga" />
      </Helmet>
      <div className="flex flex-col gap-y-5">
        <div className="h-[175px]  relative  bg-yellow-500 md:h-[300px]  w-full flex items-center justify-center">
          <h1 className="font-bold text-2xl text-white ">حالة الطلب</h1>
          <img
            src="/log/logo_2.png"
            className="w-36 absolute bottom-[-30px]"
            alt="logo"
          />
        </div>
        <div className="flex flex-col gap-y-5 px-5 p-2 w-11/12 md:w-1/2">
          <h1 className="text-2xl font-serif"> حالة الطلب </h1>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex flex-col gap-y-0.5">
              <label htmlFor="email" className="text-lg font-serif">
                البريد
              </label>
              <Input
                type="email"
                id="email"
                placeholder="أدخل البريد..."
                size={"lg"}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm italic text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-0.5">
              <label className="text-lg font-serif" htmlFor="orderId">
                رقم الطلب
              </label>
              <Input
                id="orderId"
                type="text"
                placeholder="أدخل رقم الطلب..."
                size={"lg"}
                {...register("orderId")}
              />
              {errors.orderId && (
                <p className="text-red-500 text-sm italic">
                  {errors.orderId.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              bg={"#dcb140"}
              _hover={{
                backgroundColor: "#F9C349",
              }}
              isLoading={loading}
              color={"white"}
              size={"lg"}
            >
              تأكد
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default OrderStatusPage;
