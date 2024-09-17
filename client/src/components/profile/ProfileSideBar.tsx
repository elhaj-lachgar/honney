import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AlignJustifyIcon, LogOut, X } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { BASE_URL, PROFILE_SIDE_BAR } from "../../constant";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { toastOption } from "../../lib";
import { useAddressContext } from "../../context/AddressContextProvider";

function ProfileSideBar() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const { setLoad, load } = useAddressContext();
  const { setAuthUser } = useAuthContext();
  const router = useNavigate();
  const toast = useToast();
  const signOut = () => {
    const url = BASE_URL + "/auth/sign-out";
    try {
      fetch(url, { method: "POST", credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            setAuthUser(null);
            window.localStorage.removeItem("user");
            router("/");
            setLoad(!load);
          } else {
            const option = toastOption("error", "signout failed");
            toast(option);
          }
        });
    } catch (error) {
      const option = toastOption("error", "signout failed");
      toast(option);
    }
  };
  return (
    <>
      <AlignJustifyIcon
        className="size-8 border m-3 lg:m-5 p-1 rounded-md bg-gray-100 cursor-pointer z-50 shadow-lg fixed "
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex py-2 px-3 justify-between items-center">
            <div className="font-serif">ملف شخصي</div>
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
          <div className="flex flex-col h-full p-2 gap-y-2">
            {PROFILE_SIDE_BAR.map((value, index) => (
              <motion.span
                initial={{
                  opacity: 0,
                  y: 100,
                }}
                transition={{
                  delay: index * 0.4,
                  duration: 0.5,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                key={index}
              >
                <Link
                  className="flex items-center gap-x-2 py-2 px-1  rounded  hover:bg-yellow-500 hover:text-white cursor-pointer"
                  to={value.link}
                  onClick={onClose}
                >
                  <value.icon />
                  {value.name}
                </Link>
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            transition={{
              duration: 0.5,
              delay: 0.4 * 1,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            className="flex w-full h-full items-end py-4 px-3"
          >
            <Button colorScheme="red" leftIcon={<LogOut />} onClick={signOut}>
              تسجيل خروج
            </Button>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ProfileSideBar;
