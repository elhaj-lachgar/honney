import { Button } from "@chakra-ui/react";
import {  ShoppingBasketIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const router = useNavigate();
  return (
    <div className="flex flex-col-reverse gap-4 justify-center items-center md:flex-row p-5 bg-yellow-100">
      <div className="lg:flex-1 flex justify-center">
        <img src="/section/main_6.png" alt="image " className="w-[300px]" />
      </div>
      <div className="flex lg:flex-1    ">
        <div className=" gap-y-8 text-center md:text-start text-gray-500 flex flex-col justify-center  ">
          <h1 className="text-2xl text-black font-serif font-bold md:text-4xl">
            {" "}
            منتوجات تعاونية ساجا
          </h1>
          <p className="w-[300px]">
            تقدم تعاونية ساجا الطبيعية عسلًا طبيعيًا نقيًا، وكريم تقشير لطيفًا
            لتجديد البشرة، وصابونًا بلديًا طبيعيًا لتنظيف وترطيب البشرة{" "}
          </p>
          <div className="">
            <Button
              bg={"#dcb140"}
              _hover={{
                backgroundColor: "#F9C349",
              }}
              color={"white"}
              size={"lg"}
              onClick={() => router("/668829b2c21586cc369e63b1")}
              leftIcon={<ShoppingBasketIcon />}
            >
              اطلبها الآن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
