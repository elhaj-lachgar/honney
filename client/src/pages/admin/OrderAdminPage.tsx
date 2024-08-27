import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { toastOption } from "../../lib";
import { useEffect, useState } from "react";
import { TOrder } from "../../constant/types";
import OrderItem from "../../components/OrderItem";
function OrderAdminPage() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const toast = useToast();
  const [load, setLoad] = useState(true);
  const getOrders = async () => {
    const url = BASE_URL + "/order";
    try {
      const res = await axios.get(url);
      if (res.data?.success) {
        const orders = res.data?.orders;
        setOrders(orders);
      } else {
        const option = toastOption("error", "error fetching");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "error fetching");
      toast(option);
    }
  };

  useEffect(() => {
    getOrders();
  }, [load]);
  return (
    <main className="flex flex-col gap-y-5">
      {orders.map((order) => (
        <OrderItem
          key={order._id}
          order={order}
          setLoad={setLoad}
          load={load}
        />
      ))}
    </main>
  );
}

export default OrderAdminPage;
