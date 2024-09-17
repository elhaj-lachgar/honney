import { Avatar } from "@chakra-ui/react";
import { TOrder } from "../../constant/types";

function OrderProfileItem({ order }: { order: TOrder }) {
  return (
    <div className="p-3 max-w-[400px] rounded-md border flex flex-col gap-y-2 shadow-md">
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
         رقم الطلبة :<p className="text-red-500">{order._id}</p>
        </p>
        <div className=" flex flex-wrap gap-2.5">
          {order.products.map((product , index) => (
            <div key={product.product._id.concat(`${index}`)} className="flex flex-col items-center">
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
         المجموع:
          <b>{order.totalePrice + order.currency}</b>
        </p>
        <p>
          {order.isDelaiverd ? (
            <p className="text-green-500">تم التوصل بالطلب</p>
          ) : (
            <p className="text-red-500">قيد التوصيل</p>
          )}
        </p>
      </div>
    </div>
  );
}

export default OrderProfileItem;
