import { Avatar, Button, Input, useToast } from "@chakra-ui/react";
import { TOrder } from "../constant/types";
import axios from "axios";
import { useState } from "react";
import { BASE_URL, DEFAULT_HEADER } from "../constant";
import { toastOption } from "../lib";

function OrderItem({
  order,
  load,
  setLoad,
}: {
  order: TOrder;
  load: boolean;
  setLoad: (load: boolean) => void;
}) {
  const [Delaiverd, setDelaiverd] = useState("");
  const toast = useToast();
  const orderDelaiverd = async () => {
    const url = BASE_URL + "/order/" + order._id;
    if (!order.isDelaiverd) {
      if (!Delaiverd) {
        const option = toastOption("error", "delaiverd is required");
        toast(option);
        return;
      }
      const valid = new Date(Delaiverd).getTime() < Date.now();
      if (!valid) {
        const option = toastOption("error", "delaiverd time is not valid");
        toast(option);
        return;
      }
      const data = JSON.stringify({ Delaiverd: Delaiverd });
      try {
        const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
        if (res.data?.success) {
          setLoad(!load);
          const option = toastOption(
            "success",
            "order delivery validation succeeded "
          );
          toast(option);
          return;
        } else {
          const option = toastOption(
            "error",
            "order delivery validation failed"
          );
          toast(option);
          return;
        }
      } catch (error) {
        const option = toastOption("error", "order delivery validation failed");
        toast(option);
        return;
      }
    } else {
      try {
        const res = await axios.post(url);
        if (res.data?.success) {
          setLoad(!load);
          const option = toastOption(
            "success",
            "order delivery validation succeeded "
          );
          toast(option);
          return;
        } else {
          const option = toastOption(
            "error",
            "order delivery validation failed"
          );
          toast(option);
          return;
        }
      } catch (error) {
        const option = toastOption("error", "order delivery validation failed");
        toast(option);
        return;
      }
    }
  };

  const DeleteOrder = async () => {
    if (!order.isDelaiverd) return;
    const url = BASE_URL + "/order/" + order._id;
    try {
      const res = await axios.delete(url);
      if (res.data?.success) {
        const option = toastOption("success", "order deleted successfully");
        toast(option);
        setLoad(!load);
      } else {
        const option = toastOption(
          "error",
          res.data?.error || "order deleted failed"
        );
        toast(option);
      }
    } catch (error: any) {
      const option = toastOption(
        "error",
        error?.message || "order deleted failed"
      );
      toast(option);
    }
  };

  return (
    <div className="p-3 rounded-md border flex flex-col gap-y-2 shadow-md">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-x-2">
          <Avatar />
          <div className="flex flex-col">
            <b>{order.address?.name}</b>
            <p> {order.address?.email}</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-y-2.5">
        <p className="flex gap-x-2">
          Order_Id :<p className="text-red-500">{order._id}</p>
        </p>
        <div className=" flex flex-wrap gap-2.5">
          {order.products.map((product) => (
            <div className="flex flex-col items-center">
              <img
                alt="image of product"
                className="w-28 rounded-md"
                src={product.product.imageUrls[0]}
              />
              <p className="text-sm text-gray-500">
                {product.quantity} *{" "}
                {product.product.price + product.product.currency}
              </p>
            </div>
          ))}
        </div>
        <p className="flex gap-x-2">
          totalePrice:
          <b>{order.totalePrice + order.currency}</b>
        </p>
        <hr />
        <div className="flex justify-between gap-x-3 items-center">
          {!order.isDelaiverd ? (
            <Input
              type="date"
              onChange={(e) => setDelaiverd(e.currentTarget.value)}
              maxWidth={"150px"}
            />
          ) : (
            <Button colorScheme="red" onClick={DeleteOrder}>
              Delete
            </Button>
          )}

          <Button
            colorScheme={order.isDelaiverd ? "red" : "green"}
            onClick={orderDelaiverd}
          >
            {order.isDelaiverd ? "Delaiverd" : " not Delaiverd"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
