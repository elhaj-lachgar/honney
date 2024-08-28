import { Button, useToast } from "@chakra-ui/react";
import LargeCartItem from "../components/LargeCartItem";
import MobileCartItem from "../components/MobileCartItem";
import { useCardContext } from "../context/CardContextProvider";
import { useNavigate } from "react-router-dom";
import { toastOption } from "../lib";
import { Helmet } from "react-helmet";

function ShoppingCart() {
  const { card } = useCardContext();
  const toast = useToast();
  const router = useNavigate();
  return (
    <>
      <Helmet>
        <title>{"cart"}</title>
        <meta
          name="description"
          content={`shopping cart page`}
        />
      </Helmet>
      <main className="flex flex-col  items-center my-10 ">
        <div className="flex lg:hidden flex-col gap-y-5">
          {card.products.map((product) => (
            <MobileCartItem
              quantity={product.quantity}
              product={product.product}
              productQuantity={product.productQuantity}
              key={product.product._id}
            />
          ))}
          <form className="flex flex-col border px-3 py-2 w-full gap-y-3 min-w-[300px] rounded shadow-md">
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-gray-500 font-serif">مجموع </h1>

              <b>
                {(card.products[0]?.product.currency || "MAD") +
                  (card.totalePrice || "0")}
              </b>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-gray-500 font-serif">ضريبة تسوق</h1>

              <b>{(card.products[0]?.product.currency || "MAD") + "0"}</b>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-gray-500 font-serif">مجموع كلي</h1>

              <b>
                {(card.products[0]?.product.currency || "MAD") +
                  (card.totalePrice || "0")}
              </b>
            </div>
            <Button
              bg={"#dcb140"}
              _hover={{
                backgroundColor: "#F9C349",
              }}
              color={"white"}
              onClick={() => {
                if (card.products.length > 0) router("/order");
                else {
                  const option = toastOption("error", "لايوجد عنصر");
                  toast(option);
                }
              }}
            >
              تابع التسوق
            </Button>
          </form>
        </div>
        <div className="hidden lg:flex items-center gap-x-5 w-full px-5 ">
          <div className="flex-[3] ">
            <LargeCartItem />
          </div>
          <div className="flex-1  flex min-w-[300px]  ">
            <form className="flex flex-col border px-3 py-2 w-full gap-y-3 rounded shadow-md">
              <div className="flex items-center justify-between">
                <h1 className="text-xl text-gray-500 font-serif">مجموع </h1>
                <b>
                  {(card.products[0]?.product.currency || "MAD") +
                    (card.totalePrice || "0")}
                </b>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl text-gray-500 font-serif">ضريبة تسوق</h1>
                <b>{(card.products[0]?.product.currency || "MAD") + "0"}</b>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl text-gray-500 font-serif">مجموع كلي</h1>
                <b>
                  {(card.products[0]?.product.currency || "MAD") +
                    (card.totalePrice || "0")}
                </b>
              </div>
              <Button
                bg={"#dcb140"}
                _hover={{
                  backgroundColor: "#F9C349",
                }}
                color={"white"}
                onClick={() => {
                  if (card.products.length > 0) router("/order");
                  else {
                    const option = toastOption("error", "لايوجد عنصر");
                    toast(option);
                  }
                }}
              >
                تابع التسوق
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default ShoppingCart;
