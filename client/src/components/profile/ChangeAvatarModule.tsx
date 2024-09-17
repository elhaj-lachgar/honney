import { Button, ModalHeader, useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContextProvider";
import { X } from "lucide-react";
import { toastOption } from "../../lib";
import { BASE_URL } from "../../constant";
import axios from "axios";

type TProps = {
  setLoad: (value: boolean) => void;
  load: boolean;
};

function ChangeAvatarModule({ load, setLoad }: TProps) {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const btnRef = React.useRef<null | HTMLInputElement>(null);
  const { authUser } = useAuthContext();
  const [avatar, setAvatar] = useState<FileList | null>(null);
  const [url, setUrl] = useState(authUser?.avatar);
  const toast = useToast();

  const deleteAvatar = async () => {
    const url = `${BASE_URL}/user/delete-avatar`;
    try {
      const res = await axios.delete(url);
      const Object_data = res.data;
      if (Object_data?.success) {
        setLoad(!load);
      } else {
        const option = toastOption("error", "خطاء في عملية");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "خطاء في عملية");
      toast(option);
    }
  };

  const updateAvatar = async () => {
    if (!avatar || avatar.length <= 0) return;
    const url = `${BASE_URL}/user/change-avatar`;
    const data = new FormData();
    data.append("avatar", avatar[0]);
    try {
      const res = await axios.put(url, data);
      const Object_data = res.data;

      if (Object_data?.success) {
        setLoad(!load);
      } else {
        const option = toastOption("error", "خطاء في عملية");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "خطاء في عملية");
      toast(option);
    }
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        تغير الصورة
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            تغير الصورة{" "}
            <X
              className="p-0.5 bg-red-500 rounded-md text-white size-7 cursor-pointer"
              onClick={onClose}
            />
          </ModalHeader>
          <div className="flex items-center gap-x-5 p-4 ">
            <label
              aria-hidden="true"
              htmlFor="avatar"
              className="cursor-pointer"
            >
              <img
    
                src={url || "/log/log.png"}
                alt="avatar of user"
                className="w-36 h-36 rounded-full  object-cover"
              />
              <input
                type="file"
                className="hidden"
                id="avatar"
                name="avatar"
                onChange={(e) => {
                  const {
                    currentTarget: { files },
                  } = e;
                  if (!files || files.length <= 0) return;
                  const target = files[0];
                  setAvatar(files);
                  setUrl(URL.createObjectURL(target));
                }}
              />
            </label>
            <div className="flex flex-col text justify-end gap-y-3 items-end">
              <Button
                disabled={url == authUser?.avatar}
                _disabled={{
                  backgroundColor: "",
                }}
                cursor={url == authUser?.avatar ? "not-allowed" : "pointer"}
                colorScheme="green"
                width={"150px"}
                onClick={() => {
                  if (url == authUser?.avatar) {
                    const option = toastOption("error", "لم تغير الصورة");
                    toast(option);
                    return;
                  } else {
                    updateAvatar();
                  }
                }}
              >
                تغير الصورة
              </Button>
              <Button colorScheme="red" width={"150px"} onClick={deleteAvatar}>
                حذف الصورة
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangeAvatarModule;
