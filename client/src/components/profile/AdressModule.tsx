import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import {
  resolver,
  TCreateAddressCredentials,
} from "../../validator/create-address-auth-validator";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { toastOption } from "../../lib";
import axios from "axios";
import Citys from "../../lib/city.json";
import { useForm } from "react-hook-form";

type TProps = {
  load: boolean;
  setLoad: (value: boolean) => void;
};

function AdressModule({ load, setLoad }: TProps) {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TCreateAddressCredentials>({
    resolver,
  });

  const CreateAddressAuth = async (params: TCreateAddressCredentials) => {
    setLoading(true);
    const url = `${BASE_URL}/address/create-address-auth`;
    const data = JSON.stringify({
      ...params,
      codePostal: parseInt(params?.codePostal || ""),
    });
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
    setLoading(true);
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
            onSubmit={handleSubmit(CreateAddressAuth)}
            className="flex flex-col gap-y-4 p-3"
          >
            <div className="flex flex-col gap-y-0.5 ">
              <label htmlFor="phone" className="text-xl flex items-center">
                {" "}
                هاتف <span className="text-red-500">*</span>
              </label>
              <InputGroup dir="ltr">
                <InputLeftAddon>+212</InputLeftAddon>
                <Input
                  type="number"
                  id="phone"
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
              <Input type="text" id="city" list="citys" {...register('city')}/>
              <datalist id="citys">
                {Citys.map((city) => (
                  <option key={city.id} value={city.ville} />
                ))}
              </datalist>
              {errors.city && <p className="text-red-500 italic text-sm">{errors.city.message}</p>}
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
                id="codePostal"
                type="number"
                placeholder="13100"
                {...register("codePostal")}
              />
              {errors.codePostal && (
                <p className="text-red-500 text-sm italic">
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
