import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { toastOption } from "../../lib";
import {
  resolver,
  TSetEmailCredentials,
} from "../../validator/set-email-validator";
import { useForm } from "react-hook-form";
import { TErrorService } from "../../constant/types";
import { useState } from "react";

function setEmail() {
  const router = useNavigate(); 
  const [loading , setLoading ] = useState(false);
  const toast = useToast();
  const setEmail = async (params: TSetEmailCredentials) => {
    const url = BASE_URL + "/auth/set-email";
    const data = JSON.stringify({ email: params.email });
    setLoading(true);
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      if (res.data.success) {
        window.localStorage.setItem("set-email", params.email);
        const option = toastOption("success", res.data.message);
        toast(option);
        router("/forget-password/rest-code");
      } else {
        const error = res.data as TErrorService
        const option = toastOption("error", error.error);
        toast(option);
      }
    } catch (error : any) {
      const err = error.response?.data as TErrorService 
      const option = toastOption("error", err.error);
      toast(option);
    }
    setLoading(false);
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TSetEmailCredentials>({
    resolver,
  });

  return (
    <form
      onSubmit={handleSubmit(setEmail)}
      className="p-3 border shadow-md  min-w-[300px] flex flex-col gap-y-4 rounded-md bg-white "
    >
      <h1 className="text-2xl font-serif">إرسال البريد</h1>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="email" className="font-serif text-xl">
          البريد
        </label>
        <InputGroup>
          <InputLeftElement>
            <Mail />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="أدخل بريد ..."
            {...register("email")}
          />
        </InputGroup>
        {errors.email && (
          <p className="text-red-500 text-sm italic">{errors.email.message}</p>
        )}
      </div>

      <p className="text-gray-400 text-sm px-3">
        please check your email address , you will find rest code
      </p>
      <Button
        bg={"#dcb140"}
        _hover={{
          backgroundColor: "#F9C349",
        }}
        type="submit"
        width={"100%"}
        isLoading={loading}
        color={"white"}
      >
        إرسال
      </Button>
    </form>
  );
}

export default setEmail;
