import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Mail, User, X } from "lucide-react";
import { useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContextProvider";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { toastOption } from "../../lib";
import axios from "axios";
import Citys from "../../lib/city.json";

type TProps = {
  load: boolean;
  setLoad: (value: boolean) => void;
};

function AdressModule({ load, setLoad }: TProps) {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [codePostal, setCodePostal] = useState(0);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const { authUser } = useAuthContext();
  const toast = useToast();
  const CreateAddressNotAuth = async (params: {
    email: string;
    phone: string;
    name: string;
    city: string;
    codePostal?: number;
  }) => {
    setLoading(true);
    const url = `${BASE_URL}/address/create-address-not-auth`;
    try {
      const data = JSON.stringify(params);
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      const Object_data = res.data;
      if (Object_data.success) {
        const addresses  = [
          ...((JSON.parse(
            window.localStorage.getItem("addresses") as string
          ) as string []) || []),
        ];
        addresses.push(Object_data.address._id);
        window.localStorage.setItem("addresses", JSON.stringify(addresses));
        setLoad(!load);
        const option = toastOption("success", " تم إضافة العنوان");
        toast(option);
        onClose();
      } else {
        const option = toastOption("error", "خطّأ في عملية");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "خطّأ في عملية");
      toast(option);
    }
  };

  const CreateAddressAuth = async (params: {
    phone: string;
    city: string;
    codePostal: number;
  }) => {
    setLoading(true);
    const url = `${BASE_URL}/address/create-address-auth`;
    const data = JSON.stringify(params);
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      const Object_data = res.data;
      if (Object_data?.success) {
        setLoad(!load);
        const option = toastOption("success", " تم إضافة العنوان");
        toast(option);
        onClose();
      } else {
        const option = toastOption("error", "خطّأ في عملية");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "خطّأ في عملية");
      toast(option);
    }
  };

  return (
    <>
      <Button
        bg={"#dcb140"}
        _hover={{
          backgroundColor: "#F9C349",
        }}
        width={"100%"}
        color={"white"}
        onClick={onOpen}
      >
        إضافة العنوان
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex items-center p-3 justify-between ">
            <h1 className="text-2xl"> إضافة العنوان</h1>
            <X
              className="bg-red-500 text-white rounded-md p-0.5 size-7 cursor-pointer"
              onClick={onClose}
            />
          </div>
          <hr />
          <div className="flex flex-col gap-y-4 p-3">
            {!authUser && (
              <>
                <div className="flex flex-col gap-y-0.5 ">
                  <label htmlFor="email" className="flex ">
                    البريد <span className="text-red-500">*</span>
                  </label>
                  <InputGroup>
                    <InputLeftElement>
                      <Mail />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="أدخل بريد ..."
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </InputGroup>
                </div>
                <div className="flex flex-col gap-y-0.5">
                  <label htmlFor="email">
                    ‌الأسم <span className="text-red-500">*</span>
                  </label>
                  <InputGroup>
                    <InputLeftElement>
                      <User />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="أدخل الأسم..."
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                  </InputGroup>
                </div>
              </>
            )}
            <div className="flex flex-col gap-y-0.5 ">
              <label className="text-xl flex items-center">
                {" "}
                هاتف <span className="text-red-500">*</span>
              </label>
              <div dir="ltr" className="flex items-center gap-x-2">
                +212
                <Input
                  type="number"
                  placeholder="600000000"
                  onChange={(e) => setPhone(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-0.5">
              <label className="flex items-center">
                المدينة<span className="text-red-500">*</span>
              </label>
              <Select
                dir="ltr"
                onChange={(e) => setCity(e.currentTarget.value)}
              >
                {Citys.map((city) => (
                  <option value={city.ville}>{city.ville}</option>
                ))}              
            </Select>
            </div>
      
            <div className="flex flex-col gap-y-0.5">
              <label>رقم</label>
              <Input
                type="number"
                placeholder="13100"
                onChange={(e) => setCodePostal(parseInt(e.currentTarget.value))}
              />
            </div>
            <Button
              bg={"#dcb140"}
              _hover={{
                backgroundColor: "#F9C349",
              }}
              isLoading={loading}
              width={"100%"}
              color={"white"}
              onClick={() => {
                const obj = {
                  phone,
                  codePostal,
                  city,
                };
                if (authUser) {
                  if (!phone || !city ) return;
                  CreateAddressAuth(obj).finally(() => setLoading(false));
                  return;
                }
                if (!phone || !city || !email) return;
                CreateAddressNotAuth({ ...obj, email, name }).finally(() =>
                  setLoading(false)
                );
              }}
            >
              حفظ
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdressModule;
