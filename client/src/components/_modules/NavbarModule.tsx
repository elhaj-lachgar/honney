import { AlignLeftIcon, X } from "lucide-react";
import {useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Avatar,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useId, useRef, useState } from "react";
import Logo from "../Logo";
import { BASE_URL, SECOND_NAVBAR } from "../../constant";
import { motion } from "framer-motion";
import { useAuthContext } from "../../context/AuthContextProvider";
import { TCategory } from "../../constant/types";
import { toastOption } from "../../lib";

function NavbarModule() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const router = useNavigate();
  const { authUser } = useAuthContext();
  const toast = useToast();
  const [categorys, setCategorys] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const GetCategorys = () => {
    const url = `${BASE_URL}/category`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            const { categorys } = data;
            setCategorys(categorys);
          } else {
            const option = toastOption("error", "faild to fetch category");
            toast(option);
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      const option = toastOption("error", "faild to fetch category");
      toast(option);
    }
  };

  useEffect(() => {
    GetCategorys();
  }, []);
  return (
    <>
      <AlignLeftIcon
        onClick={onOpen}
        className="p-1  size-9   bg-gray-200 shadow-md rounded-md  cursor-pointer"
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent dir="ltr">
          <div className="flex py-2 px-3 justify-between items-center">
            <div className="flex items-center gap-x-3 hover:text-yellow-500 cursor-pointer">
              <Logo />
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
              ></motion.p>
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
          <div className="flex flex-col gap-y-3 relative  w-full  pt-4 ">
            {loading
              ? [...Array(3)].map((_, i) => <Skeleton key={i} m={'2'} mx={'3'} w="14" h="4" />)
              : categorys.map((item, i) => (
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 * i,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    onClick={() => {
                      onClose();
                      router(`/search/${item._id}`);
                    }}
                    key={item._id}
                    className=" mx-3 p-2 rounded cursor-pointer   hover:text-white hover:bg-yellow-500"
                  >
                    {item.name}
                  </motion.span>
                ))}
            {SECOND_NAVBAR.map((item, i) => {
              if (authUser && i == 2) return null;
              return (
                <motion.span
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 * (i + 3),
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  onClick={() => {
                    onClose();
                    router(item.link);
                  }}
                  key={i.toString().concat(useId())}
                  className=" mx-3 p-2 rounded  cursor-pointer  hover:text-white hover:bg-yellow-500 "
                >
                  {item.name}
                </motion.span>
              );
            })}
          </div>
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            transition={{
              duration: 0.3,
              delay: 0.2 * 6,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            className="flex w-full h-full items-end py-4 px-3"
          >
            {authUser ? (
              <Avatar
                src={authUser.avatar}
                size={"sm"}
                cursor={"pointer"}
                onClick={() => router("/profile/me")}
              />
            ) : (
              <Button
                bg={"#dcb140"}
                _hover={{
                  backgroundColor: "#F9C349",
                }}
                color={"white"}
                onClick={() => router("/auth/sign-in")}
              >
                تسجيل
              </Button>
            )}
          </motion.div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NavbarModule;
