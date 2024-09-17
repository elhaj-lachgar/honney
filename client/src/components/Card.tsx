import { TProductService } from "../constant/types";
import { motion } from "framer-motion";
import { useCardContext } from "../context/CardContextProvider";
import { Heart, ShoppingBasket } from "lucide-react";
import { useWishListContext } from "../context/WishListContextProvider";
import { Button } from "@chakra-ui/react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

function Card({ product }: { product: TProductService }) {
  const { card, addToCard } = useCardContext();
  const { products, addProduct, deleteProduct } = useWishListContext();
  const isExiste =
    card.products.findIndex((pr) => pr.product._id == product._id) > -1;
  const isLiked = products.findIndex((pr) => pr._id == product._id) > -1;

  return (
    <motion.div className="flex flex-col  gap-y-3 border  rounded-md hover:shadow-lg  group items-center p-4 min-w-[300px] max-w-[400px]  ">
      <div className="relative w-full group ">
        <Link to={"/" + product._id}>
          <img
            src={product.imageUrls[0]}
            alt="image of product"
            className=" w-full h-[300px] object-cover cursor-pointer  rounded"
          />
        </Link>

        <Heart
          className={`bottom-1.5  cursor-pointer right-1.5 p-1  size-7 ${
            !isLiked ? "color bg-white" : "text-white bg-color"
          } rounded-full absolute`}
          onClick={() => {
            if (!isLiked) {
              const obj = { rating: 1, ...product };
              addProduct(obj);
              return;
            }
            deleteProduct(product);
          }}
        />
      </div>
      <div className="flex flex-col font-serif  w-full ">
        <h1 className="text-lg">{product.name}</h1>
        <h2 className="text-sm text-gray-500">{product.category.name}</h2>
        <div className="flex items-center gap-x-3">
          {product.discountPrice && (
            <del>{product.discountPrice + product.currency}</del>
          )}
          <p className="font-bold">{product.price + product.currency}</p>
        </div>
      </div>
      <div className="flex w-full  flex-row-reverse" dir="ltr">
        <StarRatings
          starDimension="20px"
          starSpacing="1px"
          starRatedColor="yellow"
          starHoverColor="yellow"
          rating={product.productRate || 0}
        />
      </div>
      <div className="w-full">
        <Button
          bg={"#dcb140"}
          _hover={{
            backgroundColor: "#F9C349",
          }}
          width={"100%"}
          color={"white"}
          leftIcon={<ShoppingBasket />}
          onClick={() => {
            if (!isExiste) {
              if (product.productQuantity.length <= 0) return;
              addToCard(product, product.productQuantity[0]);
            }
          }}
        >
          إضافة
        </Button>
      </div>
    </motion.div>
  );
}

export default Card;
