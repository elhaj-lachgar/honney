import { ShoppingBasketIcon, ShoppingCart, X } from "lucide-react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { useCardContext } from "../../context/CardContextProvider";
import ShoppingCardItem from "../ShoppingCardItem";
import { useNavigate } from "react-router-dom";
import { toastOption } from "../../lib";
function CartModule() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const toast = useToast();
  const { card } = useCardContext();
  const router = useNavigate();

  return (
    <>
      <div
        className="relative w-[36px] h-[36px] cursor-pointer"
        onClick={onOpen}
      >
        <ShoppingBasketIcon className="p-1  size-9 z-40    color  " />
        {card.products.length > 0 && (
          <p className="text-white absolute top-0 right-0  w-[20px] flex items-center justify-center h-[20px]  bg-gray-300 rounded-full">
            {card.products.length}
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
            <div className="flex items-center gap-x-3 hover:color cursor-pointer">
              <motion.span
                initial={{
                  rotate: "0deg",
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
                whileInView={{
                  rotate: ["50deg", "0deg", "-50deg", "0deg"],
                }}
              >
                <ShoppingBasketIcon className=" color size-12" />
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
                سلة المشتريات
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
          {card.products.length <= 0 ? (
            <div className="flex items-center justify-center gap-y-4 flex-col w-full h-full">
              <ShoppingCart className="color size-24" />
              <p className="color">لا يوجد عناصر</p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="flex flex-col h-full w-full p-2 overflow-auto no-scrollbar ">
                {card.products.map((product) => (
                  <ShoppingCardItem
                    onClose={onClose}
                    value="cart"
                    product={product.product}
                    productQuantity={product.productQuantity}
                    key={product.product._id}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
          <div className="py-4 bg-gray-100 border px-4 flex flex-col gap-y-2">
            <div className="flex justify-between   items-center ">
              <h1 className="text-xl font-serif">مجموع</h1>{" "}
              {card.products[0] && (
                <b>{card.totalePrice + card.products[0].product.currency}</b>
              )}
            </div>
            <Button
              bg={"#dcb140"}
              _hover={{
                backgroundColor: "#F9C349",
              }}
              color={"white"}
              width={"100%"}
              onClick={() => {
                if (card.products.length <= 0) {
                  const option = toastOption("error", "سلة مشتريات فارغة");
                  toast(option);
                  return;
                }
                router("/cart");
                onClose();
              }}
            >
              تابع التسوق
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CartModule;
