import { AlignLeftIcon, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { useId, useRef } from "react";
import Logo from "../Logo";
import { FIRST_NAVBAR, SECOND_NAVBAR } from "../../constant";
import { motion } from "framer-motion";
import { useAuthContext } from "../../context/AuthContextProvider";

function NavbarModule() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const router = useNavigate();
  const { authUser } = useAuthContext();
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
            {FIRST_NAVBAR.map((item, i) => (
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
                  router(item.link);
                }}
                key={i.toString().concat(useId())}
                className=" mx-3 p-2 rounded   hover:text-white hover:bg-yellow-500"
              >
                <Link to={"/"}>{item.name}</Link>
              </motion.span>
            ))}
            {SECOND_NAVBAR.map((item, i) => (
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
                className=" mx-3 p-2 rounded   hover:text-white hover:bg-yellow-500 "
              >
                {item.name}
              </motion.span>
            ))}
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
