import { Minus, Plus, X } from "lucide-react";
import { Input } from "@chakra-ui/react";
import {
  useCardContext,
} from "../context/CardContextProvider";
import { TProductService } from "../constant/types";

function MobileCartItem({
  product,
  quantity,
}: {
  product: TProductService;
  quantity: number;
}) {
  const {  decrementCard, deleteFromCard, incrementCard } =
    useCardContext();
  return (
    <div className="flex flex-col border min-w-[300px] shadow-lg  rounded  max-w-[400px]">
      <div className="flex justify-end p-2">
        <X
          className="size-8 bg-gray-100 p-1 rounded-full cursor-pointer"
          onClick={() => deleteFromCard(product)}
        />
      </div>
      <hr />
      <a href={"/" + product._id} className="mx-auto p-2">
        <img src={product.imageUrls[0]} alt="" className="w-48 h-48" />
      </a>
      <hr />
      <div className="flex flex-col">
        <div className="flex items-center  py-2 px-4">
          <div className="flex-1 font-serif text-xl"> منتج : </div>
          <div className="flex-1 flex justify-end">{product.name}</div>
        </div>
        <hr />
        <div className="flex items-center  py-2 px-4">
          <div className="flex-1 font-serif text-xl"> تمن : </div>
          <div className="flex-1 flex justify-end">
            {product.price + product.currency}
          </div>
        </div>
        <hr />
        <div className="flex items-center  py-2 px-4">
          <div className="flex-1 font-serif text-xl"> كمية : </div>
          <div className="flex-1 flex justify-end gap-x-1 items-center">
            <Plus
              className="size-8 bg-gray-100 p-1 rounded-full cursor-pointer"
              onClick={() => incrementCard(product)}
            />
            <Input
              value={quantity}
              type="number"
              width={"40px"}
              size={"sm"}
            />
            <Minus
              className="size-8 bg-gray-100 p-1 rounded-full cursor-pointer"
              onClick={() => decrementCard(product)}
            />
          </div>
        </div>
        <hr />
        <div className="flex items-center py-2 px-4">
          <div className="flex-1 font-serif text-lg">مجموع</div>
          <div className="flex-1 flex justify-end gap-x-1 items-center">
            {product.price * quantity + product.currency}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileCartItem;
