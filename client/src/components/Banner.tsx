import { Button, Skeleton } from "@chakra-ui/react";
import { ShoppingBasketIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
function Banner({
  productId,
  loading,
}: {
  productId?: string;
  loading: boolean;
}) {
  const router = useNavigate();
  return (
    <div className="flex flex-col-reverse gap-4 justify-center items-center md:flex-row p-5 bg-yellow-100">
      <div className="lg:flex-1 flex justify-center">
        <Suspense
          fallback={
            <Skeleton width={"300px"} height={"300px"} colorScheme="yellow" />
          }
        >
          <img src="/section/main_6.png" alt="image " className="w-[300px]" />
        </Suspense>
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
            {productId && (
              <Button
                bg={"#dcb140"}
                _hover={{
                  backgroundColor: "#F9C349",
                }}
                color={"white"}
                size={"lg"}
                onClick={() => router("/" + productId)}
                leftIcon={<ShoppingBasketIcon />}
                isLoading={loading}
              >
                اطلبها الآن
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
