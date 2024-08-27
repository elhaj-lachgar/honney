import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AlignJustifyIcon, LogOut, X } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { SIDE_BAR_ADMIN } from "../../constant";
import { Link } from "react-router-dom";

function AdminSideBar() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  return (
    <>
      <AlignJustifyIcon
        className="size-8 border p-1 rounded-md bg-gray-100 cursor-pointer z-50 shadow-lg fixed "
        onClick={onOpen}
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
            <div className="font-serif">Admin Panel</div>
            <motion.span
              className="bg-green-500 rounded text-white cursor-pointer flex items-center justify-center"
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
            {SIDE_BAR_ADMIN.map((value, index) => (
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

              >
                <Link
                  className="flex items-center gap-x-2 py-2 px-1  rounded  hover:bg-green-500 hover:text-white cursor-pointer"
                  to={value.link}
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
              delay: 0.4 * 4,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            className="flex w-full h-full items-end py-4 px-3"
          >
            <Button colorScheme="red" leftIcon={<LogOut />}>
              Log out
            </Button>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AdminSideBar;
