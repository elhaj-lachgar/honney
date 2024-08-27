import { useEffect, useState } from "react";
import { TOrder, TUser } from "../../constant/types";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { toastOption } from "../../lib";
import { Spinner, useToast } from "@chakra-ui/react";
import OrderProfileItem from "../../components/profile/OrderProfileItem";

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
    } catch (error) {
      const option = toastOption("error", "خطاء في عملية");
      toast(option);
    }
    setLoading(false);
  };

  // const getOrders = async () => {
  //   const url = BASE_URL + "/order";
  //   try {
  //     const res = await axios.get(url);
  //     if (res.data?.success) {
  //       const orders = res.data?.orders;
  //       setOrders(orders);
  //     } else {
  //       const option = toastOption("error", "error fetching");
  //       toast(option);
  //     }
  //   } catch (error) {
  //     const option = toastOption("error", "error fetching");
  //     toast(option);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 ">
      {loading ? (
        <div className=" flex items-center justify-center h-screen">
          <Spinner size={"xl"} />
        </div>
      ) : (
        <div className="flex flex-col gap-y-5  justify-center items-center  mt-20">
          {orders.map((order) => (
            <OrderProfileItem order={order} key={order._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderProfilePage;
