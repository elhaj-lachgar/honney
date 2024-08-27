import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import React, { useState } from "react";
import { X } from "lucide-react";
import { toastOption } from "../../lib";

function CreateCategoryPage() {
  const [name, setName] = useState("");
  // const [image, setImage] = useState<File | null>(null);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [ loading , setLoading ] = useState(false);
  const toast = useToast();
  const btnRef = React.useRef<null | HTMLInputElement>(null);
  const [url, setUrl] = useState("/log/log.png");
  const CreateCategoryHandler = () => {
    if (!name) return;
    const data = JSON.stringify({ name });
    const url = `${BASE_URL}/category`;
    try {
      setLoading(true);
      fetch(url, { method: "POST", body: data , headers:DEFAULT_HEADER })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            const option = toastOption(
              "success",
              "create category successfully"
            );
            toast(option);
            window.location.reload();
          } else {
            const option = toastOption("error", "create category failed");
            toast(option);
          }
        })
        .finally(()=>setLoading(false));
    } catch (error) {
      const option = toastOption("error", "create category failed");
      toast(option);
    }
  };
  return (
    <div className="flex  items-center justify-center h-screen ">
      <div className="p-4 border flex gap-y-4 flex-col  rounded-md shadow-2xl w-11/12 bg-white md:w-[300px]">
        <h1 className="text-xl md:text-2xl font-serif">Create Category</h1>
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="name" className="font-serif">
            Name
          </label>
          <Input
            type="text"
            placeholder="Enter category..."
            onChange={(e) => {
              const { value } = e.currentTarget;
              setName(value);
            }}
          />
        </div>
        <div className="flex flex-col gap-y-0.5">
          <>
            <Button
              onClick={onOpen}
              bg={"#dcb140"}
              _hover={{
                backgroundColor: "#F9C349",
              }}
              width={"100%"}
              color={"white"}
            >
              Upload Image Category
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
              <ModalOverlay />
              <ModalContent dir="ltr">
                <ModalHeader
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <h1>Upload Image</h1>
                  <X
                    className="p-0.5 bg-red-500 cursor-pointer text-white rounded-md size-8"
                    onClick={onClose}
                  />
                </ModalHeader>
                <div className="flex  items-center gap-x-5  p-4  ">
                  <label
                    htmlFor="category-upload"
                    aria-hidden="true"
                    className="w-32 h-32 rounded-full cursor-pointer"
                  >
                    <img
                      src={url}
                      alt="category image"
                      className="w-32 h-32 rounded-full"
                    />
                    <input
                      type="file"
                      id="category-upload"
                      className="hidden"
                      onChange={(e) => {
                        const { files } = e.currentTarget;
                        if (!files || files.length === 0) return;
                        const local = URL.createObjectURL(files[0]);
                        setUrl(local);
                      }}
                    />
                  </label>
                  <div className="flex flex-col ">
                    <Button
                      colorScheme="green"
                      disabled={url == "/log/log.pn"}
                      cursor={url == "/log/log.png" ? "not-allowed" : "pointer"}
                    >
                      Upload Image
                    </Button>
                  </div>
                </div>
              </ModalContent>
            </Modal>
          </>
        </div>
        <Button
          colorScheme="green"
          onClick={() => {
            if (!name) {
              const option = toastOption("error", "please enter a name");
              toast(option);
              return;
            }
            CreateCategoryHandler();
          }}
          isLoading={loading}
        >
          Create Category
        </Button>
      </div>
    </div>
  );
}

export default CreateCategoryPage;
