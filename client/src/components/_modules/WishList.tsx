import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Heart, X } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useWishListContext } from "../../context/WishListContextProvider";
import ShoppingCardItem from "../ShoppingCardItem";

function WishList() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const { products, clearList } = useWishListContext();

  return (
    <>
      <div
        className="relative w-[36px] h-[36px] cursor-pointer"
        onClick={onOpen}
      >
        <Heart className="p-1  size-9 z-40   color  " />
        {products.length > 0 && (
          <p className="text-white absolute top-0 right-0  w-[20px] flex items-center justify-center h-[20px]  bg-gray-300 rounded-full">
            {products.length}
          </p>
        )}
      </div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent dir="ltr">
          <div className="flex py-2 px-3 justify-between items-center">
            <div className="flex items-center hover:color gap-x-3">
              <motion.span
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.85,
                }}
              >
                <Heart className="p-1  size-12 z-40    color  " />
              </motion.span>
              <motion.p
                initial={{
                  x: -50,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
              >
                {" "}
                المفضلة
              </motion.p>
            </div>
            <motion.span
              className="bg-red-500 rounded text-white cursor-pointer flex items-center justify-center"
              initial={{
                scale: 0,
              }}
              transition={{
                duration: 0.65,
              }}
              whileInView={{
                scale: 0.75,
              }}
              onClick={onClose}
            >
              <X className=" size-7" />
            </motion.span>
          </div>
          <hr />
          {products.length <= 0 ? (
            <div className="flex items-center justify-center gap-y-4 flex-col w-full h-full">
              <Heart className="color size-24" />
              <p className="color">لا يوجد عناصر</p>
            </div>
          ) : (
            <div className="flex flex-col h-full w-full p-2  ">
              {products.map((product) => (
                <ShoppingCardItem
                  value="wishlist"
                  product={product}
                  key={product._id}
                />
              ))}
            </div>
          )}
          <div className="py-4 bg-gray-100 border px-4 flex flex-col gap-y-2">
            <Button colorScheme="red" onClick={clearList}>
              حذف الكل
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default WishList;
