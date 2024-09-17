import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  MenuItem,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  resolver,
  TUpdateAddressCredentials,
} from "../../validator/update-address-validator";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { toastOption } from "../../lib";
import axios from "axios";
import Citys from "../../lib/city.json";
import { useForm } from "react-hook-form";
import { TAddress, TErrorService } from "../../constant/types";
import { useAuthContext } from "../../context/AuthContextProvider";

type TProps = {
  load: boolean;
  setLoad: (value: boolean) => void;
  address: TAddress;
};

function UpdateAdressModule({ load, setLoad, address }: TProps) {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const toast = useToast();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<TUpdateAddressCredentials>({
    resolver,
  });

  useEffect(() => {
    setValue("city", address.city);
    setValue("streat", address.streat);
    setValue("codePostal", address.codePostal?.toString());
    setValue("phone", address.phone);
  }, []);

  const UpdateAddress = async (params: TUpdateAddressCredentials) => {
    if (
      params.city == address.city &&
      params.codePostal == address.codePostal &&
      params.phone == address.phone &&
      params.phone == address.phone
    )
      return;
    if (params.city == address.city) params.city = undefined;
    if (params.codePostal == address.codePostal) params.codePostal = undefined;
    if (params.phone == address.phone) params.phone = undefined;
    if (params.streat == address.streat) params.streat = undefined;
    const data = JSON.stringify(
      authUser ? params : { ...params, email: address.email }
    );

    const url = BASE_URL + "/address/" + address._id;
    setLoading(true);
    try {
      const res = await axios.put(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const option = toastOption("success", "address update successful");
        toast(option);
        onClose();
        setLoad(!load);
      } else {
        const message = "Could not update address";
        const option = toastOption("error", message);
        toast(option);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error);
      toast(option);
    }
    setLoading(false);
  };

  return (
    <>
      <MenuItem onClick={onOpen}>تعديل</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex items-center p-3 justify-between ">
            <h1 className="text-2xl"> تعديل العنوان</h1>
            <X
              className="bg-red-500 text-white rounded-md p-0.5 size-7 cursor-pointer"
              onClick={onClose}
            />
          </div>
          <hr />
          <form
            onSubmit={handleSubmit(UpdateAddress)}
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
              <Input type="text" id="city" list="citys" {...register("city")} />
              <datalist id="citys">
                {Citys.map((city) => (
                  <option key={city.id} value={city.ville} />
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

export default UpdateAdressModule;
