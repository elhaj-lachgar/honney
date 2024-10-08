import { useEffect, useState } from "react";
import { TErrorService, TOrder, TUser } from "../../constant/types";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { toastOption } from "../../lib";
import { Spinner, useToast } from "@chakra-ui/react";
import OrderProfileItem from "../../components/profile/OrderProfileItem";
import {  PackageXIcon } from "lucide-react";

function OrderProfilePage() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const getUser = async () => {
    const url = `${BASE_URL}/user/get-user`;
    try {
      const res = await axios.get(url);
      const Object_data = res.data;
      if (Object_data.success) {
        const user = Object_data.user as TUser;
        setOrders(user.userOrder);
      } else {
        const option = toastOption("error", "خطاء في عملية");
        toast(option);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error || "خطأ أثناء العملية ");
      toast(option);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 ">
      {loading ? (
        <div className=" flex items-center justify-center h-screen">
          <Spinner size={"xl"} />
        </div>
      ) : orders.length > 0 ? (
        <div className="flex flex-col gap-y-5  justify-center items-center  mt-20">
          {orders.map((order) => (
            <OrderProfileItem order={order} key={order._id} />
          ))}
        </div>
      ) : (
        <div className="flex items-center h-screen justify-center">
          <div className="flex items-center flex-col gap-y-2 ">
            <PackageXIcon className="size-40 text-yellow-500" />
            <p className="text-gray-600 text-xl">لا يوجد طلبات بعد</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderProfilePage;
