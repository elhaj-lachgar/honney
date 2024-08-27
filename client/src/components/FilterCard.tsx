import { ShoppingBasket } from "lucide-react";
import { TProductService } from "../constant/types";
import { Button } from "@chakra-ui/react";
import { useCardContext } from "../context/CardContextProvider";
import StarRating from "react-star-ratings";

function FilterCard({ product }: { product: TProductService }) {
  const { addToCard } = useCardContext();
  return (
    <div className="flex flex-col lg:flex-row rounded shadow border p-2 lg:px-3 w-full items-center justify-between">
      <div className="flex  flex-col lg:flex-row items-center gap-x-4 ">
        <a href={"/" + product._id}>
          <img
            src={product.imageUrls[0]}
            alt="image of product"
            className=" w-48 h-48 lg:w-36 lg:h-36 rounded-md"
          />
        </a>
        <div className="flex flex-col justify-between w-full lg:w-fit text-gray-500   font-serif ">
          <h1 className="text-black text-xl">{product.name}</h1>
          <h2>{product.category.name}</h2>
          <div className="flex items-center">
            <StarRating
              starDimension="20px"
              starSpacing="1px"
              starRatedColor="yellow"
              starHoverColor="yellow"
              rating={product.productRate || 0}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col   w-full lg:w-fit  lg:items-center gap-y-2">
        <div className="flex items-center gap-x-2">
          <b>{product.currency + product.price}</b>
          {product.discountPrice && (
            <del>{product.currency + product.discountPrice}</del>
          )}
        </div>
        <Button
          size={"sm"}
          leftIcon={<ShoppingBasket />}
          bg={"#dcb140"}
          _hover={{
            backgroundColor: "#F9C349",
          }}
          color={"white"}
          onClick={() => addToCard(product)}
        >
          إضافة
        </Button>
      </div>
    </div>
  );
}

export default FilterCard;
