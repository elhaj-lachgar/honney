import { X } from "lucide-react";
import { useCardContext } from "../context/CardContextProvider";
import { motion, useAnimationControls } from "framer-motion";
import { useWishListContext } from "../context/WishListContextProvider";
import { TProductService } from "../constant/types";
import { Link } from "react-router-dom";

function ShoppingCardItem({
  product,
  value,
  productQuantity,
  onClose,
}: {
  product: TProductService;
  value: "cart" | "wishlist";
  productQuantity?: { _id: string; number: number; quantity: number };
  onClose: () => void;
}) {
  const { deleteFromCard } = useCardContext();
  const controls = useAnimationControls();
  const { deleteProduct } = useWishListContext();
  return (
    <motion.div
      transition={{
        duration: 0.75,
      }}
      variants={{
        init: {
          scale: 1,
        },
        disable: {
          scale: 0,
        },
      }}
      initial="init"
      animate={controls}
      className="flex  justify-between  items-center  gap-x-2 shadow-md  border rounded p-2 "
    >
      <div className="flex gap-x-3">
        <Link
          to={"/" + product._id}
          onClick={onClose}
          className="cursor-pointer"
        >
          <img
            src={product.imageUrls[0]}
            alt="product image"
            className="w-20 h-full min-h-20 rounded"
          />
        </Link>
        <div className="flex flex-col h-full justify-between">
          <h1>{product.name}</h1>
          <h2 className="text-sm text-gray-400">{product.category.name}</h2>
          <b>
            {product.price * (productQuantity?.number || 1) + product.currency}
          </b>
          {value == "cart" && (
            <p className="p-0.5 rounded bg-gray-100 w-fit border text-gray-700 ">
              {productQuantity?.quantity + " g"}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end    gap-x-2">
        <X
          className="bg-red-500 text-white  p-1 rounded-full  cursor-pointer"
          onClick={() => {
            if (value == "cart") {
              if (!productQuantity) return;
              deleteFromCard(product, productQuantity);
            } else deleteProduct(product);
            controls.start("disable");
          }}
        />
      </div>
    </motion.div>
  );
}

export default ShoppingCardItem;
