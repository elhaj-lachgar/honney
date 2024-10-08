import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Mail, User, X } from "lucide-react";
import { useRef, useState } from "react";
import { BASE_URL, DEFAULT_HEADER } from "../constant";
import { toastOption } from "../lib";
import axios from "axios";
import Citys from "../lib/city.json";
import {
  resolver,
  TCreateAddressCredentials,
} from "../validator/create-address-validator";
import { useForm } from "react-hook-form";
type TProps = {
  load: boolean;
  setLoad: (value: boolean) => void;
};

function AdressModule({ load, setLoad }: TProps) {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TCreateAddressCredentials>({
    resolver,
  });
  const toast = useToast();

  const CreateAddressNotAuth = async (params: TCreateAddressCredentials) => {
    setLoading(true);
    const url = `${BASE_URL}/address/create-address-not-auth`;

    try {
      const data = JSON.stringify({
        ...params,
        codePostal: parseInt(params?.codePostal || ""),
      });
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      const Object_data = res.data;
      if (Object_data.success) {
        const addresses = [
          ...((JSON.parse(
            window.localStorage.getItem("addresses") as string
          ) as string[]) || []),
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
    setLoading(false);
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
          <form
            onSubmit={handleSubmit(CreateAddressNotAuth)}
            className="flex flex-col gap-y-4 p-3"
          >
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
                  id="email"
                  placeholder="أدخل بريد ..."
                  {...register("email")}
                />
              </InputGroup>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-0.5">
              <label htmlFor="name">
                ‌الأسم <span className="text-red-500">*</span>
              </label>
              <InputGroup>
                <InputLeftElement>
                  <User />
                </InputLeftElement>
                <Input
                  type="text"
                  id="name"
                  placeholder="أدخل الأسم..."
                  {...register("name")}
                />
              </InputGroup>
              {errors.name && (
                <p className="text-red-500 italic text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-0.5 ">
              <label htmlFor="phone" className="text-xl flex items-center">
                {" "}
                هاتف <span className="text-red-500">*</span>
              </label>
              <InputGroup dir="ltr">
                <InputLeftAddon>+212</InputLeftAddon>
                <Input
                  id="phone"
                  type="number"
                  placeholder="ex.600000000"
                  {...register("phone")}
                />
              </InputGroup>
              {errors.phone && (
                <p className="text-red-500 italic text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-0.5">
              <label htmlFor="city" className="flex items-center">
                المدينة<span className="text-red-500">*</span>
              </label>
              <Input type="text" list="city" {...register("city")} />
              <datalist id="city" dir="l">
                {Citys.map((city) => (
                  <option value={city.ville} />
                ))}
              </datalist>
              {errors.city && (
                <p className="text-red-500 italic text-sm">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-0.5">
              <label htmlFor="streat" className="flex items-center">
                الموقع<span className="text-red-500">*</span>
              </label>
              <Input type="text" id="streat" {...register("streat")} />
              {errors.streat && (
                <p className="text-red-500 italic text-sm">
                  {errors.streat.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-0.5">
              <label htmlFor="codePostal">رقم</label>
              <Input
                type="number"
                id="codePostal"
                placeholder="10000"
                {...register("codePostal")}
              />
              {errors.codePostal && (
                <p className="text-red-500 italic text-sm">
                  {errors.codePostal.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              bg={"#dcb140"}
              _hover={{
                backgroundColor: "#F9C349",
              }}
              isLoading={loading}
              width={"100%"}
              color={"white"}
            >
              حفظ
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdressModule;
