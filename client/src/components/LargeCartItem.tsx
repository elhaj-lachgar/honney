import { Minus, Plus, X } from "lucide-react";
import { Input } from "@chakra-ui/react";
import { useCardContext } from "../context/CardContextProvider";
import { Link } from "react-router-dom";

function LargeCartItem() {
  const { card, decrementCard, deleteFromCard, incrementCard } =
    useCardContext();
  return (
    <div className="flex flex-col w-full  border rounded ">
      <div className="flex items-center text-xl font-serif p-2 px-5 bg-yellow-50 ">
        <div className="flex-[3]">منتج </div>
        <div className="flex-1"> تمن </div>
        <div className="flex-1 ">كمية </div>
        <div className="flex-1 justify-end flex"> مجموع </div>
      </div>
      <hr />
      {card.products.map((product) => (
        <>
          <div
            className="flex items-center text-gray-600  px-2 "
            key={product.product._id}
          >
            <div className="flex-[3] py-2  flex items-center gap-x-2">
              <X
                className="size-8 bg-gray-100 p-1 rounded-full cursor-pointer"
                onClick={() =>
                  deleteFromCard(product.product, product.productQuantity)
                }
              />
              <Link id="links" to={"/" + product.product._id}>
                <img
                  src={product.product.imageUrls[0]}
                  alt=""
                  className="w-24 h-24 "
                />
              </Link>
              {product.product.name.substring(0,10)+"..." + " "}
              <span dir="ltr">{product.productQuantity.quantity + " g"}</span>
            </div>
            <div className="flex-1">
              {product.product.price * product.productQuantity.number +
                product.product.currency}
            </div>
            <div className="flex-1 ">
              <div className="flex-1 flex  gap-x-1 items-center">
                <Plus
                  className="size-8 bg-gray-100 p-1 rounded-full cursor-pointer"
                  onClick={() =>
                    incrementCard(product.product, product.productQuantity)
                  }
                />
                <Input
                  value={product.quantity}
                  type="number"
                  width={"40px"}
                  size={"sm"}
                />

                <Minus
                  className="size-8 bg-gray-100 p-1 rounded-full cursor-pointer"
                  onClick={() =>
                    decrementCard(product.product, product.productQuantity)
                  }
                />
              </div>
            </div>
            <div className="flex-1 justify-end flex px-3">
              {product.product.price *
                product.quantity *
                product.productQuantity.number +
                product.product.currency}
            </div>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}

export default LargeCartItem;
